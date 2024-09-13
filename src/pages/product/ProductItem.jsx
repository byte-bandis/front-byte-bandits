import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "./ProductItem.css";
import styled from "styled-components";
import { getLikes } from "../../store/likesThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../assets/images/no-image.jpg";
import slugify from "slugify";
import { setLike } from "../../store/likesThunk";

const ProductItem = ({ ad, $customTransform, $customMargin }) => {
  const { _id, adTitle, sell, price, photo, tags, user } = ad;
  const origin = import.meta.env.VITE_API_BASE_URL;
  const image = photo ? photo : "../../assets/images/no-image.jpg";
  const authUser = useSelector((state) => state.authState.user.userId);
  const dispatch = useDispatch();
  const slug = slugify(adTitle, {
    replacement: "-",
    lower: true,
  });
  const [iLikeIt, setiLikeIt] = useState(false);
  useEffect(() => {
    dispatch(getLikes(_id));
  }, [_id, dispatch]);
  const likesCount = useSelector((state) => state.likesSlice.adcrosslikes[_id]);

  const mylikes = useSelector((state) => state.likesSlice.wishlist);
  useEffect(() => {
    const filteredLikes = mylikes.filter((like) => like.ad=== _id || like.ad._id === _id);
    console.log('Anuncios en mylikes:', mylikes);
    console.log('¿Este anuncio tiene like?', filteredLikes.length > 0);
    setiLikeIt(filteredLikes.length > 0);
  }, [mylikes, _id]);
  const handleLike = () => {
    dispatch(setLike({adId:_id, userId:user._id}));
   
  };
  
  return (
    <ReducirContainer
      $customMargin={$customMargin}
      $customTransform={$customTransform}
    >
      <div className="likeContinerDisplay">
      {iLikeIt ? (
        <HeartFill
          className={authUser ? "heart heartbutton" : "heart"}
          color="var(--accent-100)"
          onClick={authUser ? handleLike : null}
        />
      ) : (
        <Heart
          className={authUser ? "heart heartbutton" : "heart"}
          color="var(--accent-100)"
          onClick={authUser ? handleLike : null}
        />
      )}
        <h6 className="likes">{likesCount}</h6>
      </div>
      
      <Link
        className="add"
        to={`/product/${_id}/${slug}`}
      >
        <StyledSingleAd className={`single-ad ${sell ? "" : "buyitem"}`}>
          <div className="img-container">
            {photo ? (
              <img
                src={image}
                alt={"Imagen de " + adTitle}
                crossOrigin={origin}
              />
            ) : (
              <img
                className="noImg"
                src={image}
                alt="Articulo sin foto"
              />
            )}
          </div>

          <div className="textcontainer">
            <strong className="">{price} €</strong>
            <p className="item">{adTitle}</p>
            <p className={`pill sell ${sell ? "" : "buy"}`}>
              {sell ? "Venta" : "Compra"}
            </p>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="pill"
                >
                  <p className="pill-text">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </StyledSingleAd>
      </Link>
    </ReducirContainer>
  );
};

ProductItem.propTypes = {
  ad: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    adTitle: PropTypes.string.isRequired,
    adBody: PropTypes.string.isRequired,
    sell: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
      creditCard: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  $customMargin: PropTypes.string,
  $customTransform: PropTypes.string,
};

export default ProductItem;
const StyledSingleAd = styled.div`
  box-shadow: 0px 0px 1px 1px var(--shadow-1);
  display: flex;
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  overflow: hidden;
  width: ${(props) => props.$customWidth || "100%"};
aspect-ratio: 0.8;
  max-height: ${(props) => props.$customMaxHeight || "100%"};
  gap: ${(props) => props.$customGap || "4px"};
  transition: 0.09s;
  border-radius: 10px;
  padding-bottom: 10px;
  position: relative;
&.buyitem {
    color: var(--botton-2);
    background: var( --primary-100);
  }
  background: var(--bg-200);
  
  & .count {
    top: 4px;
    left: 30px;
    color: "var(--accent-100)"
    font-size: 20px;
    font-weight: bold;
  }
  & .item {
    margin: 0;
    color: var(--text-100);
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .img-container {
    sposition: relative;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    aspect-ratio: 0.9;
    justify-content: center;
    align-items: center;
    background: var(--bg-100);
    overflow: hidden;
    &:has(.noImg) img {
      width: 40%;
      height: 40%;
      object-fit: cover;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .noImg {
      opacity: 0.6;
    }
  }
  & .textcontainer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 10px;
    padding-right: 10px;
  }

  & strong {
    font-size: large;
    color: var(--text-100);
  }
  & .pill {
    text-align: center;
    padding: 1px 4px;
    border-radius: 10px;
    color: var(--tag-2);
    height: fit-content;
    background: var(--accent-100);
    gap: 4px;

    & .pill-text {
      color: var(--tag-2);
      font-size: 12px;
      font-weight: bold;
      padding: 0px 4px;
      margin: 0;
    }
  }
  & .tags-container {
    display: flex;
    overflow: hidden;
    height: fit-content;
    gap: 4px;
  }
  & .sell {
    color: var(--bg-100);
    background: var( --primary-200);
  }
  & .buy {
    color: var(--bg-100);
    background: var( --primary-300);
  }
  &:hover {
    transform: scale(1.01);
  }
`;

const ReducirContainer = styled.div`
  margin: ${(props) => props.$customMargin || "0px"};
  transform: ${(props) => props.$customTransform || "scale(1.0)"};
  position: relative;
  .likeContinerDisplay {
  background: var(--bg-100-alpha);
  border-radius: 1px 5px 5px 1px;
  border: 1px dotted var(--shadow-1);
  width: fit-content;
  padding: 3px 3px 3px 12px;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 7px;
    left: -4px;
    color: var(--text-1);
    z-index: 10;
    gap: 5px;
    h6 {
      margin: 0;
      font-weight: bold;
      font-size: 14px;
      
    }
  & .heart {
    &:hover {
      transform: scale(1.2);
    }
  }
  }

  & .heartbutton {
    cursor: auto;
  }
  width: 100%;
`;

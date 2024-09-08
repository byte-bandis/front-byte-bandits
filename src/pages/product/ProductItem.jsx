import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import "./ProductItem.css";
import styled from "styled-components";
import { getLikes } from "../../store/likesThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../../assets/images/no-image.jpg";
import slugify from "slugify";

const ProductItem = ({ ad, $customTransform, $customMargin }) => {
  const { _id, adTitle, sell, price, photo, tags } = ad;
  const origin = import.meta.env.VITE_API_BASE_URL;
  const image = photo ? photo : "../../assets/images/no-image.jpg";

  const dispatch = useDispatch();
  const slug = slugify(adTitle, {
    replacement: "-",
    lower: true,
  });
  useEffect(() => {
    dispatch(getLikes(_id));
  }, [_id, dispatch]);
  const likesCount = useSelector((state) => state.likesSlice.adcrosslikes[_id]);

  let iLikeIt = false;
  const myLikes = useSelector((state) => state.likesSlice.wishlist);
  myLikes.forEach((like) => {
    if (like.ad && like.ad._id === _id) {
      iLikeIt = true;
    }
  });

  return (
    <ReducirContainer
      $customMargin={$customMargin}
      $customTransform={$customTransform}
    >
      <Link className="add" to={`/product/${_id}/${slug}`}>
        <StyledSingleAd className="single-ad">
          <div className="heart">
            {iLikeIt ? <HeartFill color="red" /> : <Heart color="red" />}
          </div>
          <div className="heart count">
            <p>{likesCount}</p>
          </div>

          <div className="img-container">
            {photo ? (
              <img
                src={image}
                alt={"Imagen de " + adTitle}
                crossOrigin={origin}
              />
            ) : (
              <img className="noImg" src={image} alt="Articulo sin foto" />
            )}
          </div>

          <div className="textcontainer">
            <strong className="">{price} €</strong>
            <p className="item">{adTitle}</p>
            <p className="pill sell">{sell ? "Venta" : "Compra"}</p>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <div key={index} className="pill">
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
  box-shadow: 0px 0px 9px 4px var(--shadow-1);
  display: flex;
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  overflow: hidden;
  width: ${(props) => props.$customWidth || "200px"};
  max-height: ${(props) => props.$customMaxHeight || "300px"};
  gap: ${(props) => props.$customGap || "4px"};
  transition: 0.09s;
  border-radius: 10px;
  padding-bottom: 10px;
  position: relative;

  background: var(--bg-200);
  & .heart {
    position: absolute;
    top: 7px;
    left: 10px;
    z-index: 10;
  }
  & .count {
    top: 4px;
    left: 30px;
    color: red;
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
    position: relative;
    max-width: 100%;
    height: 200px;
    max-height: 100%;
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
    color: var(--botton-2);
    background: var(--primary-300);
  }
  &:hover {
    transform: translate(0, -5px);
  }
`;

const ReducirContainer = styled.div`
  margin: ${(props) => props.$customMargin || "0px"};
  transform: ${(props) => props.$customTransform || "scale(1.0)"};
`;

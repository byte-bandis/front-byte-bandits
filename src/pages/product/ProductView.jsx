import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAd, getAds } from "../../store/adsThunk";
import styled from "styled-components";
import Button from "./components/Button";
import "./ProductItem.css";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { setLike } from "../../utils/setLike";

const ProductView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const origin = import.meta.env.VITE_API_BASE_URL;

  const [iLikeIt, setiLikeIt] = useState(false);

  const loadedAds = useSelector((state) => state.adsState.data).find(
    (onead) => onead._id === productId
  );
  const myLikes = useSelector((state) => state.likesSlice.wishlist);

  const handleBack = () => {
    const to = location.state?.from || "/";
    navigate(to, { replace: true });
  };
  const handleDelete = () => {
    dispatch(deleteAd(productId));
  };    
  const userid =
    useSelector((state) => state.authState.user.userId) ||
    "66b34cadb8e664205eacd16f";
  const handleLike = () => {
    dispatch(setLike(productId, userid));
    setiLikeIt(!iLikeIt);
  };
  useEffect(() => {
    if (!loadedAds) {
      dispatch(getAds({ id: productId }));
    }
  }, [loadedAds, productId, dispatch]);

  useEffect(() => {
    myLikes.forEach((like) => {
      console.log(like);
    if (like.ad && like.ad._id === productId) {
      setiLikeIt(true);
  }
});
  }, [myLikes, productId]);

  if (loadedAds) {
    const { adTitle, adBody, sell, price, photo, tags } = loadedAds;
    const image = photo ? `${photo}` : "../../assets/images/no-image.jpg";

    return (
      <>
        {/* <Confirmator
			  textValue='Seguro que desea borrar?'
			  onConfirm={handleDeleteConfirm}
			  hidden={hideDelete}
			  sethiden={setHideDelete}
		  /> */}
        <StyledAdvertPage className="advert">
          <Button className="heart" onClick={handleLike}>
            {iLikeIt ? <HeartFill color="red" /> : <Heart color="red" />}
          </Button>
          {adTitle && (
            <>
              <div className="advert-img-container">
                {image ? (
                  <img
                    src={image}
                    alt={"Imagen de" + adTitle}
                    crossOrigin={origin}
                  />
                ) : (
                  <img
                    className="advert-noImg"
                    src={image}
                    alt="Articulo sin foto"
                  />
                )}
              </div>
              <div className="advert-priceNameBlock">
                <h2>{adTitle}</h2>
                <h2>{`${price}  €`}</h2>
                <p>{adBody}</p>
              </div>
              <div className="advert-tags-container">
                {tags.map((tag, index) => (
                  <div key={index} className="advert-tagLink">
                    {tag}
                  </div>
                ))}
                <div className="advert-tagLink">
                  {sell ? "Venta" : "Compra"}
                </div>
              </div>
              {
                <div>
                   <Button
                                id='removeAdButton'
                                onClick={handleDelete}
                                $customheight='28px'
                            >
                    Borrar
                  </Button>
                  <Button
                    id="backButton"
                    $customheight="28px"
                    onClick={handleBack}
                  >
                    Volver
                  </Button>
                </div>
              }
            </>
          )}
          {/* {error && (
				  <ErrorMessage className='advert-loginPage-error'>
					  <h3>{error.message.toUpperCase()}</h3>
				  </ErrorMessage>
			  )} */}
        </StyledAdvertPage>
      </>
    );
  }
};

ProductView.propTypes = {
  ad: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    adTitle: PropTypes.string.isRequired,
    adBody: PropTypes.string.isRequired,
    sell: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string,
    user: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

const StyledAdvertPage = styled.div`
  box-shadow: 0px 0px 5px 2px var(--shadow-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
  max-width: 90%;
  background-color: var(--advert-1);
  padding: 20px 10px;
  border-radius: 10px;
  gap: 10px;
  margin: 0px auto;
  position: relative;

  & .heart {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 10;
  }
  & h2,
  h1,
  p {
    margin-left: 14px;
    color: var(--text-1);
  }

  & .advert-priceNameBlock {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
  }

  & .advert-img-container {
    margin-bottom: 20px;
    display: flex;
    width: 640px;
    max-width: 96%;
    height: 480px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background: var(--advert-2);
    overflow: hidden;

    &:has(.advert-noImg) img {
      width: 40%;
      height: 40%;
      object-fit: cover;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .advert-noImg {
      opacity: 0.6;
    }
  }

  & .advert-tags-container {
    display: flex;
    overflow: hidden;
    height: fit-content;
    gap: 4px;

    & .advert-tagLink {
      text-align: center;
      padding: 3px 5px;
      border-radius: 3px;
      color: var(--tag-2);
      height: fit-content;
      background: var(--tag-1);
    }
  }
`;

export default ProductView;

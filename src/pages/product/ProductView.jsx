import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAd, getAds } from "../../store/adsThunk";
import styled from "styled-components";
import Button from "./components/Button";
import { Heart, HeartFill, ChatFill, BrushFill } from "react-bootstrap-icons";
import CommentItem from "./components/CommentItem";
import CommentForm from "./components/CommentForm";
import { getComments } from "../../store/commentsThunk";
import Confirmator from "../../components/shared/Confirmator";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import { RegularButton } from "../../components/shared/buttons";
import BuyButton from "./components/BuyButton";
import { setLike } from "../../store/likesThunk";
import noImage from "../../assets/images/no-image.jpg";

const ProductView = () => {
  const origin = import.meta.env.VITE_API_BASE_URL;
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const goBack = "/";

  const { productId } = useParams();

  const [owner, setOwnerId] = useState("");
  const [iLikeIt, setiLikeIt] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);
  const [toEditComment, setToEditComment] = useState({
    commentText: "",
    score: 0,
  });

  const authUser = useSelector((state) => state.authState.user.userId);
  const loadedAds = useSelector((state) => state.adsState.data).find(
    (onead) => onead._id === productId
  );
  const myLikes = useSelector((state) => state.likesSlice.wishlist);
  const comments = useSelector((state) => state.commentsSlice.data);
  const userid = useSelector((state) => state.authState.user.userId);
  const usersData = useSelector((state) => state.singlePublicProfile.data);
  const username = useSelector((state) => state.authState.user.userName);
  let userphoto;
  const likesCount = useSelector(
    (state) => state.likesSlice.adcrosslikes[productId]
  );
  const userData = usersData.find((user) => user.userName == owner.username);
  if (userData) {
    userphoto = userData.userPhoto;
  }
  useEffect(() => {
    dispatch(getComments(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    const filteredLikes = myLikes.filter(
      (like) => like.ad === productId || like.ad._id === productId,
    );
    setiLikeIt(filteredLikes.length > 0);
    }, [myLikes, productId]);

  useEffect(() => {
    const publicProfile = () => {
      if (owner) {
        dispatch(getSinglePublicProfileWithThunk(owner.username));
      }
    };
    publicProfile();
  }, [owner, dispatch]);

  useEffect(() => {
    if (!loadedAds) {
      dispatch(getAds({ id: productId }));
    } else {
      setOwnerId(loadedAds.user);
    }
  }, [loadedAds, productId, dispatch]);
  const handleBack = () => {
    const to = location.state?.from || "/";
    navigate(to, { replace: true });
  };
  const handleDelete = () => {
    setHideDelete(true);
  };
  const handleLike = () => {
    dispatch(setLike( {adId: productId, userid}));
  };
  const handleDeleteConfirm = async () => {
    dispatch(deleteAd(productId));
    navigate(goBack, { replace: true });
  };

  if (loadedAds) {
    const { adTitle, adBody, sell, price, photo, tags } = loadedAds;
    const image = photo ? photo : noImage;
    return (
      <>
        {
          <Confirmator
            textValue="borrar este anuncio?"
            onConfirm={handleDeleteConfirm}
            hidden={hideDelete}
            sethiden={setHideDelete}
          />
        }
        <StyledAdvertPage className="advert">
        <div className='likeContinerDisplay'>
        {iLikeIt ? (
          <HeartFill
            className={authUser ? 'heart heartbutton' : 'heart'}
            color='var(--accent-100)'
            size={20}
            onClick={authUser ? handleLike : null}
          />
        ) : (
          <Heart
            className={authUser ? 'heart heartbutton' : 'heart'}
            color='var(--accent-100)'
            onClick={authUser ? handleLike : null}
          />
        )}
        <h6 className='likes'>{likesCount}</h6>
      </div>

          {authUser === owner._id ? (
            <RegularButton
              className="edit-chat-button"
              onClick={() => {
                navigate(`/${username}/edit/${productId}`);
              }}
              $customBackground="var(--primary-200)"
              $customColor="var(--bg-100)"
            >
              <BrushFill /> Editar
            </RegularButton>
          ) : (
            <RegularButton
              className="edit-chat-button"
              onClick={() => {
                if (authUser) {
                  navigate(
                    `/${username}/chat?productId=${productId}&buyerId=${userid}`
                  );
                } else {
                  navigate("/login", {
                    replace: true,
                    state: {
                      from: `/chat?productId=${productId}`,
                    },
                  });
                }
              }}
              $customBackground="var(--primary-200)"
              $customColor="var(--bg-100)"
            >
              <ChatFill /> Chat
            </RegularButton>
          )}

          <BuyButton ownerId={owner._id} />

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
              <Link
                className="userBlock"
                to={`/${owner.username}`}
              >
                <img
                  className="userPhoto"
                  src={userphoto}
                  alt="userphoto"
                  crossOrigin={origin}
                />
                <p className="username">{owner.username}</p>
              </Link>
              <div className="advert-priceNameBlock">
                <h2>{adTitle}</h2>
                <h2>{`${price}  €`}</h2>
                <p>{adBody}</p>
              </div>
              <div className="advert-tags-container">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="advert-tagLink"
                  >
                    {tag}
                  </div>
                ))}
                <div className="advert-tagLink">
                  {sell ? "Venta" : "Compra"}
                </div>
              </div>
              {
                <div>
                  {authUser === owner._id && (
                    <Button
                      id="removeAdButton"
                      onClick={handleDelete}
                      $customheight="28px"
                    >
                      Borrar
                    </Button>
                  )}
                  <Button
                    id="backButton"
                    $customheight="28px"
                    onClick={handleBack}
                  >
                    Volver
                  </Button>
                </div>
              }
              {!!authUser && (
                <CommentForm
                  productId={productId}
                  toEditComment={toEditComment}
                  editMode={editMode}
                />
              )}
              {comments.length > 0 && (
                <div className="advert-comments-box">
                  <h3>Comentarios</h3>
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      productId={productId}
                      setEditMode={setEditMode}
                      setToEditComment={setToEditComment}
                    />
                  ))}
                </div>
              )}
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
};

const StyledAdvertPage = styled.div`
  box-shadow: 0px 0px 5px 2px var(--shadow-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
  padding-bottom: 20px;
  max-width: 90%;
  background-color: var(--advert-1);
  border-radius: 10px;
  gap: 10px;
  margin: 2% auto;
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
      top: 20px;
      left: -4px;
      color: var(--text-1);
      z-index: 10;
      gap: 5px;

      h6 {
          margin: 0;
          font-weight: bold;
          font-size: 20px;
      }

      & .heart {
          &:hover {
              transform: scale(1.2);
          }
      }
  }

  .heartbutton {
      cursor: auto;
  }
  & .heartbutton {
    cursor: pointer;
  }
  & .edit-chat-button {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  & h2,
  h1,
  p {
    margin-left: 14px;
    color: var(--text-1);
  }
  & .userBlock {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 25px;
    margin-left: 14px;
  }
  & .username {
    font-weight: bold;
    margin: 0;
  }
  & .userPhoto {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }
  & .advert-priceNameBlock {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
  }
  & .advert-comments-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    
  }
  & .advert-img-container {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 480px;
    border-radius: 10px 10px 0 0 ;
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
      background: var(--accent-100);
    }
  }
`;

export default ProductView;

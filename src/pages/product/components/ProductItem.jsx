import { Link } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getLikes, setLike } from '../../../store/likesThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import noImage from '../../../assets/images/no-image.jpg';

const ProductItem = ({ item, $customTransform, $customMargin }) => {
  const { _id, adTitle, sell, price, photo, tags, user } = item;
  const origin = import.meta.env.VITE_API_BASE_URL;

  const image = photo || noImage;
  const authUser = useSelector((state) => state.authState.user.userId);
  const dispatch = useDispatch();
  const slug = slugify(adTitle, { replacement: '-', lower: true });
  const [iLikeIt, setiLikeIt] = useState(false);

  useEffect(() => {
    dispatch(getLikes(_id));
  }, [_id, dispatch]);

  const likesCount = useSelector((state) => state.likesSlice.adcrosslikes[_id]);
  const mylikes = useSelector((state) => state.likesSlice.wishlist);

  useEffect(() => {
    const filteredLikes = mylikes.filter((like) => like.ad === _id || like.ad._id === _id);
    setiLikeIt(filteredLikes.length > 0);
  }, [mylikes, _id]);

  const handleLike = () => {
    dispatch(setLike({ adId: _id, userId: user._id }));
  };

  return (
    <ReducirContainer $customMargin={$customMargin} $customTransform={$customTransform}>
      <div className="likeContinerDisplay">
        {iLikeIt ? (
          <HeartFill
            className={authUser ? 'heart heartbutton' : 'heart'}
            color="var(--accent-100)"
            onClick={authUser ? handleLike : null}
          />
        ) : (
          <Heart
            className={authUser ? 'heart heartbutton' : 'heart'}
            color="var(--accent-100)"
            onClick={authUser ? handleLike : null}
          />
        )}
        <h6 className="likes">{likesCount}</h6>
      </div>

      <Link className="add" to={`/product/${_id}/${slug}`}>
        <StyledSingleAd className={`single-ad ${sell ? '' : 'buyitem'}`}>
          <div className="img-container">
            <img src={image} alt={photo ? `Imagen de ${adTitle}` : 'Artículo sin foto'} crossOrigin={origin} className={!photo ? 'noImg' : ''} />
          </div>

          <div className="textcontainer">
            <strong>{price} €</strong>
            <p className="item">{adTitle}</p>
            <p className={`pill sell ${sell ? '' : 'buy'}`}>{sell ? 'Venta' : 'Compra'}</p>
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
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    adTitle: PropTypes.string.isRequired,
    sell: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  $customMargin: PropTypes.string,
  $customTransform: PropTypes.string,
};

export default ProductItem;

const StyledSingleAd = styled.div`
  box-shadow: 0px 0px 1px 1px var(--shadow-1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 0.8;
  max-width: 280px;
  gap: 4px;
  transition: 0.09s;
  border-radius: 10px;
  padding-bottom: 10px;
  position: relative;
  background: var(--bg-200);

  &.buyitem {
    color: var(--botton-2);
    background: var(--primary-100);
  }

  .item {
    margin: 0;
    color: var(--text-100);
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .img-container {
    position: relative;
    max-width: 100%;
    height: auto;
    aspect-ratio: 0.9;
    background: var(--bg-100);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .noImg {
      opacity: 0.6;
    }
  }

  .textcontainer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 10px;
  }

  strong {
    font-size: large;
    color: var(--text-100);
  }

  .pill {
    text-align: center;
    padding: 1px 4px;
    border-radius: 10px;
    background: var(--accent-100);

    .pill-text {
      color: var(--tag-2);
      font-size: 12px;
      font-weight: bold;
      margin: 0;
    }
  }

  .tags-container {
    display: flex;
    gap: 4px;
  }

  .sell {
    color: var(--bg-100);
    background: var(--primary-200);
  }

  .buy {
    color: var(--bg-100);
    background: var(--primary-300);
  }

  &:hover {
    transform: scale(1.01);
  }
`;

const ReducirContainer = styled.div`
  margin: ${(props) => props.$customMargin || '0px'};
  transform: ${(props) => props.$customTransform || 'scale(1.0)'};
  position: relative;
  width: 100%;

  .likeContinerDisplay {
    background: var(--bg-100-alpha);
    border-radius: 1px 5px 5px 1px;
    border: 1px dotted var(--shadow-1);
    width: fit-content;
    padding: 3px 12px;
    position: absolute;
    display: flex;
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

    .heart {
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .heartbutton {
    cursor: auto;
  }

  .price {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

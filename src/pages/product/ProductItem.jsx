import { Link } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import './ProductItem.css';
import styled from 'styled-components';
import { getLikes } from '../../store/likesThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const ProductItem = ({ ad }) => {
    const { _id, adTitle, sell, price, photo, tags } = ad;
    const image = photo ? `${photo}` : null;
    const origin = import.meta.env.VITE_API_BASE_URL;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLikes(_id));
    }, [_id, dispatch]);
    const likesCount = useSelector(
        (state) => state.likesSlice.adcrosslikes[_id]
    );

    let iLikeIt = false
    const myLikes = useSelector((state) => state.likesSlice.wishlist);
    myLikes.forEach((like) => {
      if(like.ad._id === _id){
        iLikeIt = true
      }
     })
    
   
  
  
    return (
        <Link className='add' to={`/product/${_id}`}>
            <StyledSingleAd className='single-ad'>
              
                <div className='heart'>
                {iLikeIt ? <HeartFill color='red' /> : <Heart color='red' />}
                </div>
                <div className='heart count'>
                    <p>{likesCount}</p>
                </div>

                <div className='img-container'>
                    {photo ? (
                        <img
                            src={image}
                            alt={'Imagen de' + adTitle}
                            crossOrigin={origin}
                        />
                    ) : (
                        <img
                            className='noImg'
                            src={image}
                            alt='Articulo sin foto'
                            crossOrigin={origin}
                        />
                    )}
                </div>

                <div className='textcontainer'>
                    <strong className=''>{price} €</strong>
                    <p className='item'>{adTitle}</p>
                    <p className='pill sell'>{sell ? 'Venta' : 'Compra'}</p>
                    <div className='tags-container'>
                        {tags.map((tag, index) => (
                            <div key={index} className='pill'>
                                <p className='pill-text'>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </StyledSingleAd>
        </Link>
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
        user: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default ProductItem;
const StyledSingleAd = styled.div`
    box-shadow: 0px 0px 9px 4px var(--shadow-1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 240px;
    max-height: 340px;
    gap: 4px;
    transition: 0.09s;
    border-radius: 10px;
    padding-bottom: 10px;
    position: relative;

    background: var(--accent-200);
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
        color: var(--accent-100);
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
        background: var(--accent-100);
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
        color: var(--accent-100);
    }
    & .pill {
        text-align: center;
        padding: 1px 4px;
        border-radius: 10px;
        color: var(--tag-2);
        height: fit-content;
        background: var(--tag-1);
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
        background: var(--botton-1);
    }
    &:hover {
        transform: translate(0, -5px);
    }
`;

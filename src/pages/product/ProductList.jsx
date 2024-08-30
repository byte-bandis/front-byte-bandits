import ProductItem from './ProductItem';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAds } from '../../store/adsThunk';
import styled from 'styled-components';
import Pager from '../pagination/Pager';
import { getWishlist } from '../../store/likesThunk';
import ErrorMessage from './components/ErrorMessage';
import { resetMessage } from '../../store/uiSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.adsState.page);
    const userid = useSelector((state) => state.authState.user.userId);
    const errorUi = useSelector((state) => state.ui);
    const filters = useSelector((state) => state.adsState.filters);
    const adsData = useSelector((state) => state.adsState.data);

    const resetError = () => {
        dispatch(resetMessage());
    };

    let error = null;
    if (errorUi.state === 'error') {
        error = errorUi.message;
    }

    useEffect(() => {
        dispatch(getAds({ page, id: '', filters }));
        if (userid) {
            dispatch(getWishlist(userid));
        }
    }, [dispatch, page, userid, filters]);

    return (
        <>
            <StyledAdList className='ad-list'>
                {adsData.length > 0 ? (
                    adsData.map((ad) => (
                        <ProductItem
                            ad={ad}
                            key={ad._id}
                            adTitle={ad.adTitle}
                            adBody={ad.adBody}
                            sell={ad.sell}
                            price={ad.price}
                            photo={ad.photo}
                            user={ad.user}
                            createdAt={ad.createdAt}
                            updatedAt={ad.updatedAt}
                            tags={ad.tags || []}
                        />
                    ))
                ) : (
                    <p className='no-ad'>No hay resultados</p>
                )}
                {error && (
                    <ErrorMessage
                        className='loginPage-error'
                        onClick={resetError}
                    >
                        <h3>{error.toUpperCase()}</h3>
                    </ErrorMessage>
                )}
            </StyledAdList>
            <Pager></Pager>
        </>
    );
};
ProductList.propTypes = {
    filtersState: propTypes.shape({
        search: propTypes.string,
        tags: propTypes.arrayOf(propTypes.string),
        buysell: propTypes.oneOf(['all', 'sell', 'buy']),
        price: propTypes.number,
    }),
};
const StyledAdList = styled.div`
    margin: auto;
    display: grid;
    justify-content: center;
    gap: 10px;
    grid-template-columns: repeat(4, 235px);
    padding-top: 0px;

    &:has(.no-ad[noad]) {
        display: flex;
    }

    .no-ad {
        color: silver;
        text-wrap: nowrap;
        text-align: start;
    }
`;
export default ProductList;

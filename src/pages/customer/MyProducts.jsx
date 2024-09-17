import { useTranslation } from 'react-i18next';
import './Profile.css';
import PropTypes from 'prop-types';
import StyledContainer from '../../components/shared/StyledContainer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListItems from '../product/components/ListItems';
import getTotalAds from '../../store/adscounThunk';
import { useEffect } from 'react';
import { getAds } from '../../store/adsThunk';
import Pager from '../pagination/Pager';
import ProductItem from '../product/components/ProductItem';

const MyProducts = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const page = useSelector((state) => state.adsState.page);
    const filters = useSelector((state) => state.adsState.filters);
    const urlParams = new URLSearchParams(window.location.search);
    const adsAccount = useSelector((state) => state.adsState.totalAds);
    const adsData = useSelector((state) => state.adsState.data);
    const limit = urlParams.get('limit');

    const { username } = useParams();
    const currentUrl = window.location.href;

    useEffect(() => {
        dispatch(getTotalAds({ user: username }));
        const allFilters = { ...filters, page, limit };
        if (username) {
            allFilters.user = username;
        }
        dispatch(getAds({ id: '', filters: allFilters }));
    }, [dispatch, filters, limit, page, username]);
    return (
        <>
            <StyledContainer
                className={className}
                $customMargin='0 0 3rem 1rem'
                $customColor='var(--primary-300)'
                $customWidth='90%'
            >
                <h2>{t('product_list_owner', { username })}</h2>
            </StyledContainer>
            <StyledContainer
                className={
                    !currentUrl.includes(`${username}/info`)
                        ? 'profile-for-visitors'
                        : ''
                }
                $customDisplay='flex'
                $customPadding='2rem'
                $customAlignItems='center'
                $customMargin='0 0 2rem 0'
                $customBorder='1px dotted var(--primary-300)'
                $customBorderRadius='10px'
                $customWidth='80%'
            >
                <ListItems
                    $customMargin='0 0 0 2rem'
                    $customWidth='100%'
                    data={adsData}
                    ItemContiner={ProductItem}
                />
                <Pager
                    adsAccount={adsAccount}
                    limit={3}
                    page={page}
                ></Pager>
            </StyledContainer>
        </>
    );
};

MyProducts.propTypes = {
    className: PropTypes.string,
};
export default MyProducts;

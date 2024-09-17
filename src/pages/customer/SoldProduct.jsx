import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsSeller } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";
import TransactionItem from "./components/TransactionItem";
import ProductItem from "../product/components/ProductItem";
import Pager from "../pagination/Pager";
import { useParams } from "react-router-dom";
import getTotalAds from "../../store/adscounThunk";
import { getAds } from "../../store/adsThunk";

const SoldProducts = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const filters = useSelector((state) => state.adsState.filters);
  const limit = urlParams.get('limit');
  const page = useSelector((state) => state.adsState.page);

  const soldProductsData = useSelector(
    (state) => state.transactions.ordersSold,
  );
  const { username } = useParams();
  console.log("soldiseruProductsData", soldProductsData);
  const [showSoldProducts, setShowSoldProducts] = useState(true);
  const [adsListSellerSoldProducts, setAdsListSellerSoldProducts] = useState([]);

  useEffect(() => {
    dispatch(getTotalAds({ user: username }));
    const allFilters = { ...filters, page, limit };

    if (username) {
        allFilters.user = username;
    }
    dispatch(getAds({ id: '', filters: allFilters }));
}, [adsData, dispatch, filters, limit, page, username]);

  const adsAccount = useSelector((state) => state.adsState.totalAds);

  console.log("adsData", adsData);
  console.log("soldProductsData", soldProductsData);
  console.log("adsListSellerSoldProducts", adsListSellerSoldProducts);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsSeller());
    }
  }, [dispatch, userid]);

  

  useEffect(() => {
    if (userid) {
      const userSellerSoldProducts = soldProductsData.filter(
        (item) => item.seller._id === userid,
      );
      setAdsListSellerSoldProducts(userSellerSoldProducts);
    }
  }, [userid, soldProductsData]);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders sold and products in sales</StyledH1>
        <ButtonContainer>
          <button onClick={() => setShowSoldProducts(true)}>
            Products to Sell
          </button>
          <button onClick={() => setShowSoldProducts(false)}>
            Sold Products
          </button>
        </ButtonContainer>
        
        <AdsContainer>
          {showSoldProducts
            ?<>
            <ListItems data={adsData} ItemContiner={ProductItem}/>
            <Pager adsAccount={adsAccount} limit={4} page={1} ></Pager>
            </>
            : <ListItems data={adsListSellerSoldProducts} ItemContiner={TransactionItem}/>}

        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

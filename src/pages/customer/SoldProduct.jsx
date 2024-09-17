import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTotalSellerTransactions, getTransactionsSeller } from "../../store/transactionsThunk";
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
  const [showSoldProducts, setShowSoldProducts] = useState(true);
  useEffect(() => {
    dispatch(getTotalAds({ user: username }));
    const allFilters = { ...filters, page, limit };

    if (username) {
        allFilters.user = username;
    }
    dispatch(getAds({ id: '', filters: allFilters }));
}, [ dispatch, filters, limit, page, username]);

  const adsAccount = useSelector((state) => state.adsState.totalAds);
  const transactionsAccount = useSelector(
    (state) => state.transactions.totalTransactions,
  )

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsSeller({ page, limit}));
      dispatch(getTotalSellerTransactions());
    }
  }, [dispatch, limit, page, userid]);

  


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
            : <><ListItems data={soldProductsData} ItemContiner={TransactionItem}/>
            <Pager adsAccount={transactionsAccount} limit={4} page={1} ></Pager></>}

        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

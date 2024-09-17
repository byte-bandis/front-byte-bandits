import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";

const AllProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const transactionsUserData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showAllProducts, setShowAllProducts] = useState(true);
  const [adsListSales, setAdsListSales] = useState([]);
  const [adsListPurchase, setAdsListPurchase] = useState([]);

  console.log("adsData", adsData);
  console.log("transactionsUserData", transactionsUserData);
  console.log("adsListSales", adsListSales);
  console.log("adsListPurchase", adsListPurchase);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsByUser());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (userid) {
      const salesTransactions = transactionsUserData
        .filter((transaction) => transaction.seller._id === userid)
        .map((item) => item.ad);

      const purchaseTransactions = transactionsUserData
        .filter((transaction) => transaction.buyer._id === userid)
        .map((item) => item.ad);

      const userAdsForSale = adsData.filter(
        (ad) => ad.user._id === userid && !ad.sell === true,
      );

      const userAdsWanted = adsData.filter(
        (ad) => ad.user._id === userid && !ad.sell === false,
      );

      setAdsListSales([...salesTransactions, ...userAdsForSale]);

      setAdsListPurchase([...purchaseTransactions, ...userAdsWanted]);
    }
  }, [transactionsUserData, adsData, userid]);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>All transactions</StyledH1>
        <ButtonContainer>
          <button onClick={() => setShowAllProducts(true)}>Sales</button>
          <button onClick={() => setShowAllProducts(false)}>Purchases</button>
        </ButtonContainer>

        <AdsContainer>
          {showAllProducts
            ? adsListSales.length > 0
              ? adsListSales.map((ad, index) => (
                  <ListItems key={index} username={ad._id} adsData={[ad]} />
                ))
              : "There are no products"
            : adsListPurchase.length > 0
              ? adsListPurchase.map((ad, index) => (
                  <ListItems key={index} username={ad._id} adsData={[ad]} />
                ))
              : "There are no products"}
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};

export default AllProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

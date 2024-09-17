import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../product/components/ProductItem";

const AllProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const transactionsUserData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showAllProducts, setShowAllProducts] = useState(true);
  const [adsListAll, setAdsListAll] = useState([]);
  const [adsListTransactions, setAdsListTransactions] = useState([]);

  console.log("adsListAll", adsListAll);
  console.log("transactionsUserData", transactionsUserData);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsByUser());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (userid) {
      const userAds = adsData.filter((item) => item.user._id === userid);
      setAdsListAll(userAds);
    }
  }, [adsData, userid]);

  useEffect(() => {
    if (userid) {
      const userTransactions = transactionsUserData.filter(
        (item) => item.seller._id === userid,
      );
      setAdsListTransactions(userTransactions);
    }
  }, [userid, transactionsUserData]);

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
            ? adsListAll.map((ad) => <ProductItem key={ad._id} ad={ad} />)
            : adsListTransactions
                .map((item) => item.ad)
                .map((ad) => <ProductItem key={ad._id} ad={ad} />)}
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};

export default AllProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

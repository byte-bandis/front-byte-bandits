import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";

const PurchaseProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const transactionsData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showBoughtProducts, setShowSoldProducts] = useState(true);
  const [adsListBuyer, setAdsListBuyer] = useState([]);
  const [adsListBoughtProducts, setAdsListBuyerProducts] = useState([]);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsByUser());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (userid) {
      const userBuyer = adsData
        .filter((item) => item.user._id === userid)
        .filter((item) => item.sell === false);
      setAdsListBuyer(userBuyer);
    }
  }, [adsData, userid]);

  useEffect(() => {
    if (userid) {
      const userBuyerBoughtProducts = transactionsData
        .filter((item) => item.buyer)
        .filter((item) => item.buyer._id === userid);
      setAdsListBuyerProducts(userBuyerBoughtProducts);
    }
  }, [userid, transactionsData]);

  return (
    <StyledMyAccount>
      <StyledH1>Orders bought and products searched to buy</StyledH1>
      <ButtonContainer>
        <button onClick={() => setShowSoldProducts(true)}>
          Products searching to buy
        </button>
        <button onClick={() => setShowSoldProducts(false)}>
          Bought Products
        </button>
      </ButtonContainer>
      <AdsContainer>
        {showBoughtProducts
          ? adsListBuyer.map((ad, index) => (
              <ListItems
                key={index}
                username={ad.user.username}
                adsData={[ad]}
              />
            ))
          : adsListBoughtProducts
              .map((item) => item.ad)
              .map((ad, index) => (
                <ListItems key={index} userName={ad._id} adsData={[ad]} />
              ))}
      </AdsContainer>
    </StyledMyAccount>
  );
};

export default PurchaseProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

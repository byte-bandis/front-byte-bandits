import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsBuyer } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../product/components/ProductItem";

const PurchaseProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const boughtProductsData = useSelector(
    (state) => state.transactions.ordersBought
  );

  const [showBoughtProducts, setShowSoldProducts] = useState(true);
  const [adsListBuyer, setAdsListBuyer] = useState([]);
  const [adsListBoughtProducts, setAdsListBuyerProducts] = useState([]);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsBuyer());
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
      const userBuyerBoughtProducts = boughtProductsData.filter(
        (item) => item.buyer._id === userid
      );
      setAdsListBuyerProducts(userBuyerBoughtProducts);
    }
  }, [userid, boughtProductsData]);

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
          ? adsListBuyer.map((ad) => <ProductItem key={ad._id} ad={ad} />)
          : adsListBoughtProducts
              .map((item) => item.ad)
              .map((ad) => <ProductItem key={ad._id} ad={ad} />)}
      </AdsContainer>
    </StyledMyAccount>
  );
};

export default PurchaseProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

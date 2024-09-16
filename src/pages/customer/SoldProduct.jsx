import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsSeller } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductItem from "../product/components/ProductItem";

const SoldProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const soldProductsData = useSelector(
    (state) => state.transactions.ordersSold,
  );

  const [showSoldProducts, setShowSoldProducts] = useState(true);
  const [adsListSeller, setAdsListSeller] = useState([]);
  const [adsListSellerSoldProducts, setAdsListSellerSoldProducts] = useState(
    [],
  );

  console.log("adsData", adsData);
  console.log("seller", adsListSeller);
  console.log("soldProductsData", soldProductsData);
  console.log("adsListSellerSoldProducts", adsListSellerSoldProducts);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsSeller());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (userid) {
      const userSeller = adsData
        .filter((item) => item.user._id === userid)
        .filter((item) => item.sell === true);
      setAdsListSeller(userSeller);
    }
  }, [userid, adsData]);

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
            ? adsListSeller.map((ad) => <ProductItem key={ad._id} ad={ad} />)
            : adsListSellerSoldProducts
                .map((item) => item.ad)
                .map((ad) => <ProductItem key={ad._id} ad={ad} />)}
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";

const SoldProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const transactionsData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showSoldProducts, setShowSoldProducts] = useState(true);
  const [adsListSeller, setAdsListSeller] = useState([]);
  const [adsListSellerProducts, setAdsListSellerSoldProducts] = useState([]);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsByUser());
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
      const userSellerSoldProducts = transactionsData
        .filter((item) => item.seller)
        .filter((item) => item.seller._id === userid);
      setAdsListSellerSoldProducts(userSellerSoldProducts);
    }
  }, [userid, transactionsData]);

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
            ? adsListSeller.length > 0
              ? adsListSeller.map((ad, index) => (
                  <ListItems
                    key={index}
                    username={ad.user.username}
                    adsData={[ad]}
                  />
                ))
              : "There are no products"
            : adsListSellerProducts.length > 0
              ? adsListSellerProducts.map((item, index) => (
                  <ListItems
                    key={index}
                    userName={item.ad._id}
                    adsData={[item.ad]}
                  />
                ))
              : "There are no products"}
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";
import TransactionItem from "./components/TransactionItem";
import Pager from "../pagination/Pager";
import { useParams } from "react-router-dom";
import getTotalAds from "../../store/adscounThunk";
import { getAds } from "../../store/adsThunk";

const SoldProducts = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const { username } = useParams();

  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const filters = useSelector((state) => state.adsState.filters);
  const limit = urlParams.get("limit");
  const page = useSelector((state) => state.adsState.page);

  const transactionsData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showSoldProducts, setShowSoldProducts] = useState(true);
  const [adsListSeller, setAdsListSeller] = useState([]);
  const [adsListSellerProducts, setAdsListSellerSoldProducts] = useState([]);

  console.log(transactionsData);
  console.log(adsData);
  console.log("adsListSeller", adsListSeller);
  console.log("adsListSellerProducts", adsListSellerProducts);

  const userNOMBRE = adsData.map((item) => item.user);
  console.log("userNOMBRE", userNOMBRE);

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

  useEffect(() => {
    dispatch(getTotalAds({ user: username }));
    const allFilters = { ...filters, page, limit };

    if (username) {
      allFilters.user = username;
    }
    dispatch(getAds({ id: "", filters: allFilters }));
  }, [dispatch, filters, limit, page, username]);

  const adsAccount = useSelector((state) => state.adsState.totalAds);
  const transactionsAccount = useSelector(
    (state) => state.transactions.totalTransactions,
  );

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsByUser({ page, limit }));
      dispatch(getTransactionsByUser());
    }
  }, [dispatch, limit, page, userid]);

  console.log(adsData);
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
          {showSoldProducts ? (
            <>
              {adsListSeller.length > 0 ? (
                <>
                  <ListItems
                    data={adsListSeller}
                    username={adsData.map((item) => item.user._id)}
                    ItemContiner={adsData.map((item) => item.user)}
                  />
                  <Pager adsAccount={adsAccount} limit={4} page={1} />
                </>
              ) : (
                <p>There are no products to display.</p>
              )}
            </>
          ) : (
            <>
              {adsListSellerProducts.length > 0 ? (
                <>
                  <ListItems
                    data={adsListSellerProducts}
                    username={adsData}
                    ItemContiner={TransactionItem}
                  />
                  <Pager adsAccount={transactionsAccount} limit={4} page={1} />
                </>
              ) : (
                <p>There are no products to display</p>
              )}
            </>
          )}
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

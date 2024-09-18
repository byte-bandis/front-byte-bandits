import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactionsByUser } from "../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../product/components/ListItems";
import TransactionItem from "./components/TransactionItem";
import ProductItem from "../product/components/ProductItem";
import Pager from "../pagination/Pager";
import { useParams } from "react-router-dom";
import getTotalAds from "../../store/adscounThunk";
import { getAds } from "../../store/adsThunk";

const AllProducts = () => {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const { username } = useParams();

  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const filters = useSelector((state) => state.adsState.filters);
  const limit = urlParams.get("limit");
  const page = useSelector((state) => state.adsState.page);

  const transactionsUserData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const [showAllProducts, setShowAllProducts] = useState(true);

  const salesTransactions = transactionsUserData
    .filter((transaction) => transaction.seller._id === userid)
    .map((item) => ({ ...item.ad, type: "transaction" }));

  const purchaseTransactions = transactionsUserData
    .filter((transaction) => transaction.buyer._id === userid)
    .map((item) => ({ ...item.ad, type: "transaction" }));

  const userAdsForSale = adsData
    .filter((ad) => ad.user._id === userid && !ad.sell === true)
    .map((ad) => ({ ...ad, type: "ad" }));

  const userAdsWanted = adsData
    .filter((ad) => ad.user._id === userid && !ad.sell === false)
    .map((ad) => ({ ...ad, type: "ad" }));

  const userSales = [...salesTransactions, ...userAdsForSale];

  const userPurchases = [...purchaseTransactions, ...userAdsWanted];

  console.log("userSales", userSales);
  console.log("userPurchases", userPurchases);

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

  return (
    <>
      <StyledMyAccount>
        <StyledH1>All transactions</StyledH1>
        <ButtonContainer>
          <button onClick={() => setShowAllProducts(true)}>Sales</button>
          <button onClick={() => setShowAllProducts(false)}>Purchases</button>
        </ButtonContainer>

        <AdsContainer>
          {showAllProducts ? (
            <>
              {userSales.length > 0 ? (
                <>
                  <ListItems
                    data={userSales}
                    username={userSales.map((item) => item.user._id)}
                    ItemContiner={(itemData) => {
                      const item = itemData; // Desestructuramos el objeto
                      return item.type === "ad" ? ProductItem : TransactionItem;
                    }}
                  />
                  <Pager adsAccount={adsAccount} limit={4} page={1} />
                </>
              ) : (
                <p>There are no products to display.</p>
              )}
            </>
          ) : (
            <>
              {userPurchases.length > 0 ? (
                <>
                  <ListItems
                    data={userSales}
                    username={userSales.map((item) => item.user._id)}
                    ItemContiner={(itemData) => {
                      const item = itemData; // Desestructuramos el objeto
                      return item.type === "ad" ? ProductItem : TransactionItem;
                    }}
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

export default AllProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;

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
import { useTranslation } from "react-i18next";

const PurchaseProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  const userid = useSelector((state) => state.authState.user.userId);
  const adsData = useSelector((state) => state.adsState.data);
  const filters = useSelector((state) => state.adsState.filters);
  const limit = urlParams.get("limit");
  const page = useSelector((state) => state.adsState.page);

  const transactionsData = useSelector(
    (state) => state.transactions.transactionsByUser,
  );

  const { username } = useParams();
  const [showBoughtProducts, setShowSoldProducts] = useState(true);

  const userBuyer = adsData
    .filter((item) => item.user._id === userid)
    .filter((item) => item.sell === false);

  const userBuyerBoughtProducts = transactionsData
    .filter((item) => item.buyer)
    .filter((item) => item.buyer._id === userid);

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
    <StyledMyAccount>
      <StyledH3>{t("Bought and wanted products")}</StyledH3>
      <ButtonContainer>
        <button onClick={() => setShowSoldProducts(true)}>
          {t("Wanted products")}
        </button>
        <button onClick={() => setShowSoldProducts(false)}>
          {t("Purchased products")}
        </button>
      </ButtonContainer>
      <AdsContainer>
        {showBoughtProducts ? (
          <>
            {userBuyer.length > 0 ? (
              <>
                <ListItems
                  data={userBuyer}
                  username={userBuyer.map((item) => item.user._id)}
                  ItemContiner={ProductItem}
                />
                <Pager adsAccount={adsAccount} limit={4} page={1} />
              </>
            ) : (
              <p>{t("There are no products to display.")}</p>
            )}
          </>
        ) : (
          <>
            {userBuyerBoughtProducts.length > 0 ? (
              <>
                <ListItems
                  data={userBuyerBoughtProducts}
                  username={userBuyerBoughtProducts.map((item) => item._id)}
                  ItemContiner={TransactionItem}
                />
                <Pager adsAccount={transactionsAccount} limit={4} page={1} />
              </>
            ) : (
              <p>{t("There are no products to display.")}</p>
            )}
          </>
        )}
      </AdsContainer>
    </StyledMyAccount>
  );
};

export default PurchaseProducts;

const AdsContainer = styled.div``;

const StyledH3 = styled.h3``;

const ButtonContainer = styled.div``;

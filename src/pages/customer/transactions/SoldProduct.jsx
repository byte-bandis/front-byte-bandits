import StyledMyAccount from "../../../components/shared/StyledMyAccount";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountTransactions, getTransactionsByUser } from "../../../store/transactionsThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ListItems from "../../product/components/ListItems";
import TransactionItem from "../components/TransactionItem";
import Pager from "../../pagination/Pager";
import { useParams } from "react-router-dom";
import getTotalAds from "../../../store/adscounThunk";
import { getAds } from "../../../store/adsThunk";
import ProductItem from "../../product/components/ProductItem";
import { useTranslation } from "react-i18next";
import { RegularButton } from "../../../components/shared/buttons";
import StyledTitle from "./Small components/StyledTitle";
import ButtonContainer from "./Small components/ButtonsContainer";

const SoldProducts = () => {
  const { t } = useTranslation();
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
  useEffect(() => {
    if (showSoldProducts) {

    dispatch(getTotalAds({ user: username, sell: true }));
    const allFilters = { ...filters, page, limit };

    if (username) {
      allFilters.user = username;
      allFilters.sell = true
    }
    dispatch(getAds({ id: "", filters: allFilters }));
    }
  }, [dispatch, filters, limit, page, username, showSoldProducts]);

  const adsAccount = useSelector((state) => state.adsState.totalAds);
  const transactionsAccount = useSelector(
    (state) => state.transactions.count,
  );


  useEffect(() => {
    if (!showSoldProducts) {
      if (userid) {
        dispatch(getTransactionsByUser({ filters: {  seller: true, page, limit } }));
        dispatch(getCountTransactions('seller'));
      }
    }
  }, [dispatch, limit, page, userid, showSoldProducts]);

  return (
    <>
      <StyledMyAccount>
        <StyledTitle>{t("Sold orders and products to sale")}</StyledTitle>
        <ButtonContainer>
          <RegularButton onClick={() => setShowSoldProducts(true)}>
            {t("Products to Sell")}
          </RegularButton>
          <RegularButton onClick={() => setShowSoldProducts(false)}>
            {t("Sold Products")}
          </RegularButton>
        </ButtonContainer>

        <div>
          {showSoldProducts ? (
            <>
              {adsData.length > 0 ? (
                <>
                  <ListItems
                    username={adsData.map((item) => item.user._id)}
                    data={adsData}
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
              {transactionsData.length > 0 ? (
                <>
                  <ListItems
                    data={transactionsData}
                    username={transactionsData.map((item) => item._id)}
                    ItemContiner={TransactionItem}
                  />
                  <Pager adsAccount={transactionsAccount} limit={4} />
                </>
              ) : (
                <p>{t("There are no products to display.")}</p>
              )}
            </>
          )}
        </div>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

import ProductItem from "./ProductItem";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAds } from "../../store/adsThunk";
import { getTransactionsSeller } from "../../store/transactionsThunk";
import { getTransactionsBuyer } from "../../store/transactionsThunk";

import Pager from "../pagination/Pager";
import { getWishlist } from "../../store/likesThunk";
import ErrorMessage from "./components/ErrorMessage";
import { resetMessage } from "../../store/uiSlice";
import { StyledAdList } from "../../components/shared/lists";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductList = ({ showSoldProducts, $customMargin, $customTop }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const userid = useSelector((state) => state.authState.user.userId);
  const errorUi = useSelector((state) => state.ui);
  const filters = useSelector((state) => state.adsState.filters);
  const adsData = useSelector((state) => state.adsState.data);
  const soldProductsData = useSelector(
    (state) => state.transactions.ordersSold,
  );
  const boughtProductsData = useSelector(
    (state) => state.transactions.ordersBought,
  );
  const urlParams = new URLSearchParams(window.location.search);
  const limit = urlParams.get("limit");
  const { username } = useParams();
  const [adsListToShow, setAdsListToShow] = useState([]);
  const [adsListBuyer, setAdsListBuyer] = useState([]);
  const [adsListSeller, setAdsListSeller] = useState([]);
  const [adsListSellerSoldProducts, setAdsListSellerSoldProducts] = useState(
    [],
  );
  const [adsListBuyerBoughtProducts, setAdsListBuyerBoughtProducts] = useState(
    [],
  );
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const sectionURL = pathParts[2];
  const sellerToDispaly = showSoldProducts
    ? adsListToShow
    : adsListSellerSoldProducts.map((item) => item.ad);

  console.log("adsData", adsData);
  console.log("toshow", adsListToShow);
  console.log("buyer", adsListBuyer);
  console.log("seller", adsListSeller);
  console.log("soldProductsData", soldProductsData);
  console.log("adsListSellerSoldProducts", adsListSellerSoldProducts);
  console.log("boughtProductsData", boughtProductsData);
  console.log("adsListBuyerBoughtProducts", adsListBuyerBoughtProducts);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsSeller());
    }
  }, [dispatch, userid]);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactionsBuyer());
    }
  }, [dispatch, userid]);

  //adsListToShow->getAds
  useEffect(() => {
    if (username) {
      const userAds = adsData.filter((item) => item.user.username === username);
      setAdsListToShow(userAds);
    } else {
      setAdsListToShow(adsData);
    }
  }, [username, adsData]);

  //adsListBuyer->getAds
  useEffect(() => {
    if (username) {
      const userBought = adsData
        .filter((item) => item.user.username === username)
        .filter((item) => item.sell === false);
      setAdsListBuyer(userBought);
    }
  }, [username, adsData]);

  //adsListSeller->getAds
  useEffect(() => {
    if (username) {
      const userSeller = adsData
        .filter((item) => item.user.username === username)
        .filter((item) => item.sell === true);
      setAdsListSeller(userSeller);
    }
  }, [username, adsData]);

  //soldProductsData->soldProductsData
  useEffect(() => {
    if (username) {
      const userSellerSoldProducts = soldProductsData.filter(
        (item) => item.seller.username === username,
      );
      setAdsListSellerSoldProducts(userSellerSoldProducts);
    }
  }, [username, soldProductsData]);

  //boughtProductsData->soldProductsData
  useEffect(() => {
    if (username) {
      const userBuyerBoughtProducts = boughtProductsData.filter(
        (item) => item.buyer.username === username,
      );
      setAdsListBuyerBoughtProducts(userBuyerBoughtProducts);
    }
  }, [username, boughtProductsData]);

  const resetError = () => {
    dispatch(resetMessage());
  };

  let error = null;
  if (errorUi.state === "error") {
    error = errorUi.message;
  }

  useEffect(() => {
    const allFilters = { ...filters, page, limit };
    dispatch(getAds({ id: "", filters: allFilters }));

    if (userid) {
      dispatch(getWishlist({ userId: userid, page: 1, limit: 1000 }));
    }
  }, [dispatch, page, limit, userid, filters]);

  return (
    <>
      <StyledAdList
        className={`ad-list ${adsListToShow.length === 1 ? "single-ad" : ""}`}
        $customMargin={$customMargin}
        $customTop={$customTop}
      >
        {/* MyProfile*/}
        {sectionURL === "info" && adsListToShow && adsListToShow.length > 0 ? (
          adsListToShow.map((ad) => (
            <ProductItem
              ad={ad}
              key={ad._id}
              adTitle={ad.adTitle}
              adBody={ad.adBody}
              sell={ad.sell}
              price={ad.price}
              photo={ad.photo}
              user={ad.user}
              createdAt={ad.createdAt}
              updatedAt={ad.updatedAt}
              tags={ad.tags || []}
            />
          ))
        ) : (
          <p className="no-ad">{t("user_has_no_ads", { username })}</p>
        )}
        {error && (
          <ErrorMessage className="loginPage-error" onClick={resetError}>
            <h3>{error.toUpperCase()}</h3>
          </ErrorMessage>
        )}

        {/* Sales*/}
        {sectionURL === "soldProducts" &&
        sellerToDispaly &&
        sellerToDispaly.length > 0 ? (
          sellerToDispaly.map((ad) => (
            <ProductItem
              ad={ad}
              key={ad._id}
              adTitle={ad.adTitle}
              adBody={ad.adBody}
              sell={ad.sell}
              price={ad.price}
              photo={ad.photo}
              user={ad.user}
              createdAt={ad.createdAt}
              updatedAt={ad.updatedAt}
              tags={ad.tags || []}
            />
          ))
        ) : (
          <p className="no-ad">{t("user_has_no_ads", { username })}</p>
        )}
      </StyledAdList>

      <Pager></Pager>
    </>
  );
};
ProductList.propTypes = {
  filtersState: propTypes.shape({
    search: propTypes.string,
    tags: propTypes.arrayOf(propTypes.string),
    buysell: propTypes.oneOf(["all", "sell", "buy"]),
    price: propTypes.number,
  }),
  $customMargin: propTypes.string,
  $customTop: propTypes.string,
  showSoldProducts: propTypes.bool,
};

export default ProductList;

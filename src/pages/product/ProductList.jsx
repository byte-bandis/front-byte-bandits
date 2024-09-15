import ProductItem from "./ProductItem";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAds } from "../../store/adsThunk";

import Pager from "../pagination/Pager";
import { getWishlist } from "../../store/likesThunk";
import ErrorMessage from "./components/ErrorMessage";
import { resetMessage } from "../../store/uiSlice";
import { StyledAdList } from "../../components/shared/lists";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import getTotalAds from "../../store/adscounThunk";

const ProductList = ({ $customMargin, $customTop }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const userid = useSelector((state) => state.authState.user.userId);
  const errorUi = useSelector((state) => state.ui);
  const filters = useSelector((state) => state.adsState.filters);
  const adsData = useSelector((state) => state.adsState.data);
  const urlParams = new URLSearchParams(window.location.search);
  const limit = urlParams.get("limit");
  const { username } = useParams();
  const [adsListToShow, setAdsListToShow] = useState([]);
  const adsAccount = useSelector((state) => state.adsState.totalAds);
  useEffect(() => {
    dispatch(getTotalAds());
  }, [dispatch]);
  useEffect(() => {
    if (username) {
      const userAds = adsData.filter((item) => item.user.username === username);
      setAdsListToShow(userAds);
    } else {
      setAdsListToShow(adsData);
    }
  }, [username, adsData]);

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
        {adsListToShow && adsListToShow.length > 0 ? (
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
          <ErrorMessage
            className="loginPage-error"
            onClick={resetError}
          >
            <h3>{error.toUpperCase()}</h3>
          </ErrorMessage>
        )}
      </StyledAdList>
      
        <Pager adsAccount={adsAccount}></Pager>
      
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
};

export default ProductList;

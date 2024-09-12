import ProductItem from "./ProductItem";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAds } from "../../store/adsThunk";
import styled from "styled-components";
import Pager from "../pagination/Pager";
import { getWishlist } from "../../store/likesThunk";
import ErrorMessage from "./components/ErrorMessage";
import { resetMessage } from "../../store/uiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductList = ({ $customMargin }) => {
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
      >
        {adsListToShow.length > 0 ? (
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
              $customMargin={$customMargin}
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
};
const StyledAdList = styled.div`
  margin: ${(props) => props.$customMargin || "12% auto"};
  display: grid;
  justify-content: space-between;
  justify-items: center;
  width: 80%;

  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  padding-top: 0px;

  &.single-ad {
    grid-template-columns: 25%;
  }

  &:has(.no-ad[noad]) {
    display: flex;
  }

  .no-ad {
    color: silver;
    text-wrap: nowrap;
    text-align: start;
  }
`;
export default ProductList;

import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAds } from "../../store/adsThunk";

import Pager from "../pagination/Pager";
import { getWishlist } from "../../store/likesThunk";

import getTotalAds from "../../store/adscounThunk";
import ListItems from "./components/ListItems";

const ProductList = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const userid = useSelector((state) => state.authState.user.userId);
  const filters = useSelector((state) => state.adsState.filters);
  const urlParams = new URLSearchParams(window.location.search);
  const limit = urlParams.get("limit");

  const adsAccount = useSelector((state) => state.adsState.totalAds);

  const adsData = useSelector((state) => state.adsState.data);

  useEffect(() => {
    const allFilters = { ...filters, page, limit  };
    dispatch(getTotalAds());
    dispatch(getAds({ id: "", filters: allFilters }));
    if (userid) {
      dispatch(getWishlist({ userId: userid, page: 1, limit: 1000 }));
    }
  }, [dispatch, filters, limit, page, userid]);



  return (
    <>
      <ListItems adsData={adsData} />
      
      <Pager adsAccount={adsAccount}limit={10} page={page} ></Pager>
      
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
  $userId: propTypes.string,
  $limit: propTypes.string,
  totalAds: propTypes.number
};

export default ProductList;

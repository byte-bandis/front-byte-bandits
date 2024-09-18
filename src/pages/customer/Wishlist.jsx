import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ProductItem from "../product/components/ProductItem";
import { getWishlist } from "../../store/likesThunk";
import Pager from "../pagination/Pager";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTotalLikes } from "../../store/likesThunk";
import { useTranslation } from "react-i18next";
import ListItems from "../product/components/ListItems";
import StyledTitle from "./transactions/Small components/StyledTitle";

const Wishlist = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const userName = useSelector((state) => state.authState.user.userName);
  let userLikes = useSelector((state) => state.likesSlice.wishlist);
  const searchParams = new URLSearchParams(window.location.search);
  const limit = searchParams.get("limit");
  const adsAccount = useSelector((state) => state.likesSlice.totalLikes);
  useEffect(() => {
    if (userName) {
      dispatch(getWishlist({ page, limit }));
    }
  }, [dispatch, userName, page, limit]);
  useEffect(() => {
    dispatch(getTotalLikes());
  }, [dispatch]);
  userLikes = userLikes.map((like) => like.ad);
  console.log(userLikes);
  return (
    <>
      <StyledMyAccount>
        <StyledTitle>{t("Wishlist")}</StyledTitle>
        <ListItems data={userLikes} ItemContiner={ProductItem} />

        <Pager adsAccount={adsAccount} limit={4}></Pager>
      </StyledMyAccount>
    </>
  );
};

export default Wishlist;

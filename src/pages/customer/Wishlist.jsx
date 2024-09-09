import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ProductItem from "../product/ProductItem";
import { getWishlist } from "../../store/likesThunk";
import Pager from "../pagination/Pager";
import styled from "styled-components";
import P from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPage } from "../../store/adsSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const urlSegment = window.location.pathname.split("/");
  const userName = urlSegment[1];
  const userLikes = useSelector((state) => state.likesSlice.wishlist);
  const searchParams = new URLSearchParams(window.location.search);
  const limit = searchParams.get("limit");

  useEffect(() => {
    dispatch(setPage(1));
    if (userName) {
      dispatch(getWishlist({ page: 1, limit }));
    }
  }, [dispatch, userName, page, limit]);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Wishlist</StyledH1>
        <WishlistContainer>
          {" "}
          {userLikes.length > 0 ? (
            userLikes
              .map((like) => like.ad)
              .map((ad) => (
                <ProductItem
                  key={ad._id}
                  ad={ad}
                  $customTransform="scale(0.7)"
                  $customMargin="-15px"
                />
              ))
          ) : (
            <p className="no-favorites">There is no favorites</p>
          )}
        </WishlistContainer>
        <Pager></Pager>
      </StyledMyAccount>
    </>
  );
};

Wishlist.propTypes = {
  filters: P.shape({}),
};

export default Wishlist;

const StyledH1 = styled.h1`
  font-size: 3em;
  text-align: center;
  margin-bottom: 20px;
`;

const WishlistContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto 70px;
`;

import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ProductItem from "../product/ProductItem";
import { getWishlist } from "../../store/likesThunk";
import Pager from "../pagination/Pager";
import styled from "styled-components";
import P from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import likesSlice from "../../store/likesSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const urlSegment = window.location.pathname.split("/");
  const userName = urlSegment[1];
  const userLikes = useSelector((state) => state.likesSlice.wishlist);

  console.log(userName);
  // console.log(filters);
  console.log(page);
  console.log(userLikes);

  useEffect(() => {
    if (userName) {
      console.log({ username: userName, page });
      dispatch(getWishlist({ username: userName, page }));
    }
  }, [dispatch, userName, page]);

  return (
    <>
      <StyledMyAccount>
        <h1>Wishlist</h1>
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

const WishlistContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  flex-wrap: wrap;

  & .a {
    widht: 60px;
    height: 80px;
  }
`;

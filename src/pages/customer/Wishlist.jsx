import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ProductItem from "../product/components/ProductItem";
import { getWishlist } from "../../store/likesThunk";
import Pager from "../pagination/Pager";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTotalLikes } from "../../store/likesThunk";
const Wishlist = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.adsState.page);
  const userName = useSelector((state) => state.authState.user.userName);
  const userLikes = useSelector((state) => state.likesSlice.wishlist);
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
                  $customTransform="scale(0.7)"
                  $customMargin="-15px"
                />
              ))
          ) : (
            <p className="no-favorites">There is no favorites</p>
          )}
        </WishlistContainer>
        <Pager adsAccount={adsAccount}></Pager>
      </StyledMyAccount>
    </>
  );
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

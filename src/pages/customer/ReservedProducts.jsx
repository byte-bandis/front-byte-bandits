import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import P from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../../store/transactionsThunk";
import ProductItem from "../product/ProductItem";
import { ConfirmAndSendButton } from "../../components/shared/buttons";
import Pager from "../pagination/Pager";

const ReservedProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const ordersReceived = useSelector(
    (state) => state.transactions.ordersReceived,
  );

  console.log(ordersReceived);

  useEffect(() => {
    if (userid) {
      dispatch(getTransactions(userid));
    }
  }, [dispatch, userid]);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders received</StyledH1>
        <OrdersContainer>
          {ordersReceived.length > 0 ? (
            ordersReceived
              .map((like) => like.ad)
              .map((order) => <ProductItem key={order._id} ad={order} />)
          ) : (
            <p>There is no orders</p>
          )}
        </OrdersContainer>
      </StyledMyAccount>
    </>
  );
};

export default ReservedProducts;

const StyledH1 = styled.h1`
  font-size: 3em;
  text-align: center;
  margin-bottom: 20px;
`;

const OrdersContainer = styled.div``;

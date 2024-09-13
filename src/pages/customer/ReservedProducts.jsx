import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../../store/transactionsThunk";
import ProductItem from "../product/ProductItem";
import { RegularButton } from "../../components/shared/buttons";
import React from "react";
import { client } from "../../api/client";

const ReservedProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);

  const ordersReceived = useSelector(
    (state) => state.transactions.ordersReceived,
  );

  useEffect(() => {
    if (userid) {
      dispatch(getTransactions(userid));
    }
  }, [dispatch, userid]);

  const handleTransaction = async (orderId, action) => {
    try {
      const response = await client.post(
        `${import.meta.env.VITE_API_BASE_URL}transactions/handleTransactions`,
        { transactionId: orderId, action },
      );
      console.log(response);

      if (response.state === "success") {
        console.log(response.message);
        dispatch(getTransactions(userid));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders received</StyledH1>
        <OrdersContainer>
          {ordersReceived.length > 0 ? (
            ordersReceived.map((transaction) => (
              <React.Fragment key={transaction._id}>
                <ProductItem
                  ad={transaction.ad}
                  $customTransform="scale(0.7)"
                  $customMargin="-15px"
                />

                <RegularButton
                  username={userid}
                  formData={{ orderId: transaction._id }}
                  onClick={() => handleTransaction(transaction._id, "accept")}
                  key={`accept${transaction._id}`}
                  className="buttonsOrder"
                  $customBackground="var(--primary-300)"
                  $customColor="var( --bg-100)"
                  $customBorder="1px solid var(--success-border)"
                  $customVerticalPadding="0.5rem 2.5rem"
                  $customPosition="relative"
                  $customTop="-450px"
                  $customRight="-180px"
                  $customZIndex="10"
                >
                  Accept
                </RegularButton>

                <RegularButton
                  username={userid}
                  formData={{ orderId: transaction._id }}
                  onClick={() => handleTransaction(transaction._id, "rejecet")}
                  key={`reject${transaction._id}`}
                  className="buttonsOrder"
                  $customBackground="var(--accent-200)"
                  $customColor="var( --bg-100)"
                  $customBorder="1px solid var(--success-border)"
                  $customVerticalPadding="0.5rem 2.9rem"
                  $customPosition="relative"
                  $customTop="-450px"
                  $customRight="-350px"
                  $customZIndex="10"
                >
                  Reject
                </RegularButton>
              </React.Fragment>
            ))
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

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto 70px;
`;

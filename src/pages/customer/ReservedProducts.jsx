import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../../store/transactionsThunk";

import { RegularButton as BaseRegularButton } from "../../components/shared/buttons";
import React from "react";
import { client } from "../../api/client";
import CustomAlert from "../../components/shared/Alert";
import { useState } from "react";
import ListItems from "../product/components/ListItems";

const ReservedProducts = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const [response, setResponse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

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
      const res = await client.post(
        `${import.meta.env.VITE_API_BASE_URL}transactions/handleTransactions`,
        { transactionId: orderId, action },
      );
      console.log(res);
      setResponse(res);
      if (res.state === "success") {
        dispatch(getTransactions(userid));
        setShowAlert(true);
      }
    } catch (error) {
      setResponse({
        status: error,
        message: error.message,
      });
      setShowAlert(true);
    }
  };

  const customStyles = {
    $customPosition: "fixed",
    $customTop: "250px",
    $customZIndex: "15",
  };

  const handleButtonClick = (transactionId, action) => {
    handleTransaction(transactionId, action);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const commonButtonProps = {
    className: "buttonsOrder",
    $customColor: "var(--bg-100)",
    $customBorder: "1px solid var(--success-border)",
    $customVerticalPadding: "1rem 2rem",
    $customPosition: "relative",
    $customZIndex: "10",
    $customTop: "-450px",
  };

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders received</StyledH1>
        <OrdersContainer>
          {showAlert && (
            <CustomAlert
              variant={response.state === "success" ? "success" : "error"}
              onClose={() => setShowAlert(false)}
              customStyles={customStyles}
            >
              {response.message}
            </CustomAlert>
          )}
          {ordersReceived.length > 0 ? (
            ordersReceived.map((transaction, index) => (
              <React.Fragment key={index}>
                <TransactionIdContainer>{index + 1}</TransactionIdContainer>
                <TransactionIdContainer2>
                  {transaction._id}
                </TransactionIdContainer2>
                <ListItems ad={transaction.ad} ItemContiner={ListItems} />

                <ButtonsContainer>
                  <RegularButton
                    username={userid}
                    formData={{ orderId: transaction._id }}
                    onClick={() => handleButtonClick(transaction._id, "accept")}
                    key={`accept${transaction._id}`}
                    $customBackground="var(--primary-300)"
                    $customRight="0px"
                    $customTop="-450px"
                    {...commonButtonProps}
                  >
                    Accept
                  </RegularButton>

                  <RegularButton
                    username={userid}
                    formData={{ orderId: transaction._id }}
                    onClick={() => handleButtonClick(transaction._id, "accept")}
                    key={`reject${transaction._id}`}
                    $customBackground="var(--accent-200)"
                    $customRight="-20px"
                    {...commonButtonProps}
                  >
                    Reject
                  </RegularButton>
                </ButtonsContainer>
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  align-items: center;
  width: 40%;

  @media (max-width: 768px) {
   width: 85%;
   margin: -2px;
   font-size: 1.5rem;
    }
}
`;

const TransactionIdContainer = styled.div`
  font-size: 4rem;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TransactionIdContainer2 = styled.div`
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const RegularButton = styled(BaseRegularButton)`
  right: ${(props) => props.$customRight};
  top: ${(props) => props.$customTop};
  background: ${(props) => props.$customBackground};

  @media (max-width: 768px) {
    position: relative;
    right: 5px;
    top: -255px;
    padding: 0.5rem 0.5rem;
    margin: 25px;
  }
`;

const ButtonsContainer = styled.div``;

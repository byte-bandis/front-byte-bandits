import StyledMyAccount from "../../../components/shared/StyledMyAccount";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../../../store/transactionsThunk";

import { RegularButton as BaseRegularButton } from "../../../components/shared/buttons";
import { client } from "../../../api/client";
import CustomAlert from "../../../components/shared/Alert";
import { useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { useTranslation } from "react-i18next";
import StyledTitle from "./Small components/StyledTitle";

const ReservedProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.authState.user.userId);
  const [response, setResponse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ordersReceived = useSelector(
    (state) => state.transactions.getTransactions,
  );

  useEffect(() => {
    if (userid) {
      dispatch(getTransactions());
    }
  }, [dispatch, userid]);

  const handleTransaction = async (orderId, action) => {
    try {
      const res = await client.post(`transactions/handleTransactions`, {
        transactionId: orderId,
        action,
      });
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
  };

  return (
    <>
      <StyledMyAccount>
        <StyledTitle>{t("Orders received")}</StyledTitle>
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
          <>
            <OrderGrid>
              {ordersReceived.length > 0 ? (
                ordersReceived.map((transaction, index) => (
                  <OrderWrapper key={index}>
                    <TransactionItem item={transaction} key={index} />

                    <ButtonsContainer>
                      <RegularButton
                        username={userid}
                        onClick={() =>
                          handleButtonClick(transaction._id, "accept", {
                            orderId: transaction._id,
                          })
                        }
                        key={`accept${transaction._id}`}
                        $customBackground="var(--primary-300)"
                        {...commonButtonProps}
                      >
                        {t("Accept")}
                      </RegularButton>

                      <RegularButton
                        username={userid}
                        onClick={() =>
                          handleButtonClick(transaction._id, "accept", {
                            orderId: transaction._id,
                          })
                        }
                        key={`reject${transaction._id}`}
                        $customBackground="var(--accent-200)"
                        {...commonButtonProps}
                      >
                        {t("Reject")}
                      </RegularButton>
                    </ButtonsContainer>
                  </OrderWrapper>
                ))
              ) : (
                <p>{t("There are no products to display.")}</p>
              )}
            </OrderGrid>
          </>
        </OrdersContainer>
      </StyledMyAccount>
    </>
  );
};

export default ReservedProducts;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
   width: 85%;
   margin: -2px;
   font-size: 1.5rem;
    }
}
`;

const RegularButton = styled(BaseRegularButton)`
  background: ${(props) => props.$customBackground}; 
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const OrderWrapper = styled.div`
  display: flex;

  width: 280px;
  align-items: center;
  margin: auto;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;
const OrderGrid = styled.div`
  display: grid;
  top: ${(props) => props.$customTop || "0px"};
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  max-width: calc(280px * 4);
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  padding-top: 0px;
`;

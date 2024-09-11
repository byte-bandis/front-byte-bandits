import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../../store/transactionsThunk";
import { RegularButton } from "../../../components/shared/buttons";
import styled from "styled-components";
import CustomAlert from "../../../components/shared/Alert";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BuyButton = ({ ownerId }) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authState.user.userId);
  const { productId } = useParams();
  const { status, message } = useSelector((state) => state.transactions);

  const [showAlert, setShowAlert] = useState(false);

  const handleBuy = () => {
    dispatch(createTransaction({ adId: productId, userId: authUser })).then(
      () => setShowAlert(true),
    );
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const customStyles = {
    $customPosition: "absolute",
    $customTop: "250px",
    $customRight: "120px",
  };

  return (
    <>
      {authUser !== ownerId ? (
        <PurchaseButton>
          {showAlert && (
            <CustomAlert
              variant={status === "success" ? "success" : "error"}
              onClose={() => setShowAlert(false)}
              customStyles={customStyles}
            >
              {message ||
                (status === "success"
                  ? "Purchase finalized succesfuly!"
                  : "Error proccesing transaction")}
            </CustomAlert>
          )}

          <RegularButton
            onClick={handleBuy}
            className="buy-button"
            $customBackground="var(--primary-200)"
            $customColor="var(--bg-100)"
          >
            Buy
          </RegularButton>
        </PurchaseButton>
      ) : (
        ""
      )}
    </>
  );
};

export default BuyButton;

const PurchaseButton = styled.div`
  .buy-button {
    position: absolute;
    top: 450px;
    right: 260px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 45px;
  }
`;

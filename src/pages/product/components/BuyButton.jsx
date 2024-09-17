import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { RegularButton } from "../../../components/shared/buttons";
import styled from "styled-components";
import CustomAlert from "../../../components/shared/Alert";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { client } from "../../../api/client";
import { useNavigate } from "react-router-dom";
import { getLoggedUserName } from "../../../store/selectors";

const BuyButton = ({ ownerId }) => {
  const authUser = useSelector((state) => state.authState.user.userId);
  const logged = useSelector((state) => state.authState.user);
  const isLogged = logged.userName !== null;
  const navigate = useNavigate();
  const loggedUserName = useSelector(getLoggedUserName);
  const { productId } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [response, setResponse] = useState(null);

  const handleBuy = async () => {
    if (!isLogged) {
      navigate("/login");
    }
    try {
      const res = await client.post(
        `${import.meta.env.VITE_API_BASE_URL}transactions/${productId}`,
        {
          adId: productId,
        },
      );
      setResponse(res);
      setShowAlert(true);
    } catch (error) {
      setResponse({
        status: error,
        message: error.message,
      });
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        if (response?.message?.includes("credit card")) {
          navigate();
        }
        navigate(`/${loggedUserName}/info/mydata`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigate, showAlert, loggedUserName, response?.message]);

  const customStyles = {
    $customPosition: "absolute",
    $customTop: "-250px",
  };

  return (
    <>
      {authUser !== ownerId && !!logged ? (
        <PurchaseButton>
          {showAlert && (
            <CustomAlert
              variant={response.status === "success" ? "success" : "error"}
              onClose={() => {
                setShowAlert(false);
                navigate("/");
                const timer = setTimeout(() => {
                  navigate("/");
                }, 6000);
                return () => clearTimeout(timer);
              }}
              customStyles={customStyles}
            >
              {response.message ||
                (response.status === "success"
                  ? "Purchase finalized succesfuly!"
                  : response.message)}
            </CustomAlert>
          )}

          <RegularButton
            onClick={handleBuy}
            className="buy-button"
            $customBackground="var(--primary-200)"
            $customColor="var(--bg-100)"
            $customVerticalPadding="5px 45px"
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
BuyButton.propTypes = {
  ownerId: PropTypes.string.isRequired,
};
const PurchaseButton = styled.div`
  position: absolute;
  top: 450px;
  margin: 0 auto;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 45px;
`;

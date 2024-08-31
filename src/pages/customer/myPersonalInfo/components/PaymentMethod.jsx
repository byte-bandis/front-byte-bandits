import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserName,
  getMyPayment,
  getUIMessage,
  getUIState,
} from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";
import {
  getMyCreditCardWithThunk,
  updateMyCreditCardWithThunk,
} from "../../../../store/MyPersonalData/myPaymentsThunk";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";
import { Alert } from "react-bootstrap";
import { validate } from "./paymentValidations";
import { setMessage, resetMessage } from "../../../../store/uiSlice";
import {
  emptyMyPayment,
  resetValidationErrors,
  setValidations,
} from "../../../../store/MyPersonalData/paymentSlice";

const CreditCard = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myCreditCard = useSelector(getMyPayment);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    creditCard: "",
  });

  const uiState = useSelector(getUIState);
  const uiMessage = useSelector(getUIMessage);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const containerStyles = {
    $customDisplay: "flex",
    $customAlignItems: "flex-start",
    $customGap: "0",
    $customMarginTop: "1rem",
  };

  const listItemStyles = {
    $customDisplay: "flex",
    $customFlexDirection: "row",
    $customLabelFontWeight: "bold",
    $customInputPadding: "0 0 0 .5rem",
  };

  useEffect(() => {
    if (uiState !== "error" && loggedUsername === username) {
      dispatch(getMyCreditCardWithThunk(username));
    }
  }, [uiState, username, loggedUsername, dispatch]);

  useEffect(() => {
    if (uiState === "success") {
      setSuccessAlert(true);
      setErrorAlert(false);
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setErrorAlert(true);
      setSuccessAlert(false);
    }
  }, [uiState]);

  useEffect(() => {
    if (myCreditCard.updatedAt) {
      const trimmedDate = trimDate(myCreditCard.updatedAt, "ES");
      setCreationdate(trimmedDate);
    }

    /*    setFormData({
      creditCard: myCreditCard.creditCard || "",
    }); */
  }, [myCreditCard]);

  const handleShowEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleConfirmProcess = (event) => {
    event.preventDefault();
    setConfirmProcess(true);
  };

  const handleHideEditMode = (event) => {
    event.preventDefault();
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedData = {
      //...formData,
      creditCard: formData.creditCard || "card",
    };

    const errors = validate({ creditCard: formattedData.creditCard });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    dispatch(
      updateMyCreditCardWithThunk({ username, formData: formattedData })
    );
    setConfirmProcess(false);
    setEditMode(false);
    dispatch(resetMessage());
    dispatch(emptyMyPayment());
    dispatch(resetValidationErrors());
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <>
      {errorAlert && <Alert className="alert alert-danger">{uiMessage}</Alert>}
      {successAlert && (
        <Alert className="alert alert-success">{uiMessage}</Alert>
      )}

      <StyledListContainer>
        <ul key={myCreditCard._id}>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <StyledListItem $customHeaderFontSize="1.5rem">
              <h3>Credit card:</h3>
            </StyledListItem>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Credit card: </label>
                {!editMode ? (
                  <div>{myCreditCard.creditCard}</div>
                ) : (
                  <input
                    type="text"
                    name="creditCard"
                    value={formData.creditCard}
                    onChange={handleInputChange}
                    placeholder="Write between 13 to 18 digits"
                    maxLength={18}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            {editMode ? (
              <ButtonContainer $justifyContent="flex-start">
                {!confirmProcess && (
                  <>
                    <RegularButton
                      $customHoverBackgroundColor="var(--accent-100)"
                      $customMargin="2rem 0 0 0"
                      onClick={handleConfirmProcess}
                    >
                      Save your card number
                    </RegularButton>
                    <RegularButton
                      $customMargin="2rem 0 0 0"
                      onClick={handleHideEditMode}
                    >
                      Back to your saved card
                    </RegularButton>
                  </>
                )}
                {confirmProcess && (
                  <>
                    <RegularButton
                      type="submit"
                      $customHoverBackgroundColor="var(--accent-100)"
                      $customMargin="2rem 0 0 0"
                    >
                      Confirm save
                    </RegularButton>
                    <RegularButton
                      $customMargin="2rem 0 0 0"
                      onClick={handleCancelSubmit}
                    >
                      Cancel
                    </RegularButton>
                  </>
                )}
              </ButtonContainer>
            ) : (
              <RegularButton
                $customMargin="2rem 0 0 0"
                onClick={handleShowEditMode}
              >
                Click to edit
              </RegularButton>
            )}
          </form>
          {editMode && (
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <i>Last time you updated your credit card:</i>
                <div>
                  <i>{creationDate}</i>
                </div>
              </StyledListItem>
            </StyledContainer>
          )}
        </ul>
      </StyledListContainer>
    </>
  );
};

export default CreditCard;

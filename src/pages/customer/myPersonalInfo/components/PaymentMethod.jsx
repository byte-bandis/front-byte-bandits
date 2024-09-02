import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyPayment } from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";
import { useTranslation } from "react-i18next";

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
import { validate } from "./paymentValidations";
import { setMessage, resetMessage } from "../../../../store/uiSlice";
import {
  emptyMyPayment,
  resetValidationErrors,
  setValidations,
} from "../../../../store/MyPersonalData/paymentSlice";
import { CreditCard2Back } from "react-bootstrap-icons";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";

const CreditCard = () => {
  const { t } = useTranslation();
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
    if (loggedUsername === username) {
      dispatch(getMyCreditCardWithThunk(username));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    if (myCreditCard.updatedAt) {
      const trimmedDate = trimDate(myCreditCard.updatedAt, "ES");
      setCreationdate(trimmedDate);
    }
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
      creditCard: formData.creditCard || "----",
    };

    const errors = validate(t, { creditCard: formattedData.creditCard });
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
    <StyledListContainer $customWidth="80%">
      <ul key={myCreditCard._id}>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <StyledListItem $customHeaderFontSize="1.5rem">
            <h3>{t("credit_card")}</h3>
          </StyledListItem>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <label>{t("credit_card_label")}</label>
              {!editMode ? (
                <div>{myCreditCard.creditCard}</div>
              ) : (
                <input
                  type="text"
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleInputChange}
                  placeholder={t("credit_card_placeholder")}
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
                    {t("save_card_number")}
                  </RegularButton>
                  <RegularButton
                    $customMargin="2rem 0 0 0"
                    onClick={handleHideEditMode}
                  >
                    {t("back_to_saved_card")}
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
                    {t("confirm_save")}
                  </RegularButton>
                  <RegularButton
                    $customMargin="2rem 0 0 0"
                    onClick={handleCancelSubmit}
                  >
                    {t("cancel")}
                  </RegularButton>
                </>
              )}
            </ButtonContainer>
          ) : (
            <RegularButton
              $customMargin="2rem 0 0 0"
              onClick={handleShowEditMode}
            >
              {t("click_to_edit")}
            </RegularButton>
          )}
        </form>
        <IconWrapper
          IconComponent={CreditCard2Back}
          size="75px"
          color="var(--primary-200)"
          top="10%"
          right="5%"
        />
        {editMode && (
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <i>{t("last_update")}</i>
              <div>
                <i>{creationDate}</i>
              </div>
            </StyledListItem>
          </StyledContainer>
        )}
      </ul>
    </StyledListContainer>
  );
};

export default CreditCard;

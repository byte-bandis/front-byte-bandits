import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserId,
  getLoggedUserName,
} from "../../../../store/selectors";
import { useTranslation } from "react-i18next";
import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";

import { Key } from "react-bootstrap-icons";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import { useState } from "react";
import { useEffect } from "react";
import CustomAlert from "../../../../components/shared/Alert";
import { emptyMyPassword } from "../../../../store/MyPersonalData/passwordSlice";
import { useNavigate } from "react-router-dom";
import { matchMyPassword } from "../passwordService";

const PasswordUpdater = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUsername = useSelector(getLoggedUserName);
  const loggedUserId = useSelector(getLoggedUserId);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const goBack = -1;
  const [formData, setFormData] = useState({
    currentPassword: "",
  });

  const containerStyles = {
    $customDisplay: "flex",
    $customAlignItems: "flex-start",
    $customGap: "0",
    $customMargin: "1rem 0 0 0",
  };

  const listItemStyles = {
    $customDisplay: "flex",
    $customFlexDirection: "row",
    $customLabelFontWeight: "bold",
    $customInputPadding: "0 0 0 .5rem",
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setShowError(false);
    }

    const timer = setTimeout(() => {
      dispatch(emptyMyPassword());
      setShowSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      setShowSuccess(false);
    }
    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isError, dispatch]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(null);
    setIsError(null);
    try {
      const confirmedPassword = await matchMyPassword(loggedUsername, formData);
      setIsSuccess(confirmedPassword.message);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const handleCancelSubmit = () => {
    navigate(goBack);
  };

  return (
    <StyledListContainer $customWidth="80%">
      <ul key={loggedUserId}>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <StyledListItem $customHeaderFontSize="1.5rem">
            <h3>{t("confirm_current_password")}</h3>
          </StyledListItem>

          <StyledContainer {...containerStyles}>
            {showSuccess && (
              <CustomAlert variant="success">{isSuccess}</CustomAlert>
            )}
            {showError && <CustomAlert variant="error">{isError}</CustomAlert>}

            <p>{t("info_confirm_pass_before_deleting_account")}</p>
            <StyledListItem {...listItemStyles}>
              <label>{t("current_password_label")}</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder={t("current_password_placeholder")}
                required
              />
            </StyledListItem>
          </StyledContainer>

          <ButtonContainer $justifyContent="flex-start">
            <RegularButton
              type="submit"
              $customHoverBackgroundColor="var(--accent-100)"
              $customMargin="2rem 0 0 0"
            >
              {t("confirm")}
            </RegularButton>
            <RegularButton
              $customMargin="2rem 0 0 0"
              onClick={handleCancelSubmit}
            >
              {t("cancel")}
            </RegularButton>
          </ButtonContainer>
        </form>
        <IconWrapper
          IconComponent={Key}
          size="75px"
          color="var(--primary-200)"
          top="10%"
          right="5%"
        />
      </ul>
    </StyledListContainer>
  );
};

export default PasswordUpdater;

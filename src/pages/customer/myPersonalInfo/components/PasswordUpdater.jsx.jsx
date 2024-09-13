import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getLoggedUserId,
  getLoggedUserName,
  getLoggedUserUpdateTime,
  getPassword,
  getPasswordMessage,
  getPasswordState,
  getSuccess,
  getUI,
  getUIMessage,
} from "../../../../store/selectors";
import { useTranslation } from "react-i18next";
import { trimDate } from "../../../../utils/dateTools";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";
import { resetMessage, resetUI } from "../../../../store/uiSlice";

import { Key } from "react-bootstrap-icons";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import { updateMyPasswordWithThunk } from "../../../../store/MyPersonalData/myPasswordThunk";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import CustomAlert from "../../../../components/shared/Alert";
import { emptyMyPassword } from "../../../../store/MyPersonalData/passwordSlice";
import { logout } from "../../../auth/service";
import { useNavigate } from "react-router-dom";
import { resetLoggedUserInfo, setAuth } from "../../../../store/authSlice";
import { updateMyPassword } from "../passwordService";

const PasswordUpdater = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUsername = useSelector(getLoggedUserName);
  const loggedUserId = useSelector(getLoggedUserId);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const passwordDate = useSelector(getLoggedUserUpdateTime);
  const passwordState = useSelector(getPasswordState);
  const passwordMessage = useSelector(getPasswordMessage);

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

  const languageCookieFormat = Cookies.get("formatLanguage") || "en";

  useEffect(() => {
    if (passwordDate) {
      const trimmedDate = trimDate(passwordDate, languageCookieFormat);
      setUpdateTime(trimmedDate);
    }
  }, [passwordDate, languageCookieFormat]);

  useEffect(() => {
    console.log("Esto es isSuccess: ", isSuccess);
  });

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
      //dispatch(resetUI());
    }, 3000);
    return () => clearTimeout(timer);
  }, [isError, dispatch]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSuccess(null);
    setIsError(null);
    try {
      const updatedPassword = await updateMyPassword(loggedUsername, formData);
      setIsSuccess(updatedPassword.message);
      const timer = setTimeout(() => {
        logout("true");
        dispatch(setAuth(false));
        dispatch(resetLoggedUserInfo());
      }, 3000);
      return () => clearTimeout(timer);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <StyledListContainer $customWidth="80%">
      <ul key={loggedUserId}>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <StyledListItem $customHeaderFontSize="1.5rem">
            <h3>{t("change_password")}</h3>
          </StyledListItem>

          <StyledContainer {...containerStyles}>
            {showSuccess && (
              <CustomAlert variant="success">{isSuccess}</CustomAlert>
            )}
            {showError && <CustomAlert variant="error">{isError}</CustomAlert>}

            <StyledListItem {...listItemStyles}>
              <label>{t("current_password_label")}</label>
              {!editMode ? (
                <div>{t("current_password_input")}</div>
              ) : (
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder={t("current_password_placeholder")}
                  required
                />
              )}
            </StyledListItem>
          </StyledContainer>
          {editMode && (
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("new_password_label")}</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder={t("new_password_placeholder")}
                  required
                />
              </StyledListItem>
            </StyledContainer>
          )}

          {editMode ? (
            <ButtonContainer $justifyContent="flex-start">
              {!confirmProcess && (
                <>
                  <RegularButton
                    $customHoverBackgroundColor="var(--accent-100)"
                    $customMargin="2rem 0 0 0"
                    onClick={handleConfirmProcess}
                  >
                    {t("save_new_password")}
                  </RegularButton>
                  <RegularButton
                    $customMargin="2rem 0 0 0"
                    onClick={handleHideEditMode}
                  >
                    {t("back_to_saved_password")}
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
          IconComponent={Key}
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
                <i>{updateTime}</i>
              </div>
            </StyledListItem>
          </StyledContainer>
        )}
      </ul>
    </StyledListContainer>
  );
};

export default PasswordUpdater;

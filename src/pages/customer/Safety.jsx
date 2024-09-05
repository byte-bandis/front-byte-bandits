import { useState } from "react";
import RegularButton from "../../components/shared/buttons/RegularButton.jsx";
import Confirmator from "../../components/shared/Confirmator.jsx";
import StyledContainer from "../../components/shared/StyledContainer";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import PasswordUpdater from "./myPersonalInfo/components/PasswordUpdater.jsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserWithThunk } from "../../store/userThunk.js";
import {
  getLoggedUserName,
  getUIMessage,
  getUIState,
} from "../../store/selectors.js";
import { logout } from "../auth/service.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomAlert from "../../components/shared/Alert.jsx";
import { resetMessage, resetUI } from "../../store/uiSlice.js";

const Safety = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedUserName = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const [showConfirmator, setShowConfirmator] = useState(false);
  const [showPasswordChanger, setShowPassWordChanger] = useState(true);
  const [showDeletionResult, setShowDeletionResult] = useState(false);
  const deletionMessage = useSelector(getUIMessage);
  const deletionMessageType = useSelector(getUIState);

  useEffect(() => {
    if (showConfirmator) {
      setShowPassWordChanger(false);
    }
  }, [showConfirmator]);

  useEffect(() => {
    if (deletionMessageType === "success") {
      const timer = setTimeout(() => {
        resetUI();
        setShowDeletionResult(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deletionMessageType, navigate]);

  const handleShowConfirmator = () => {
    setShowConfirmator(true);
  };
  const handleHideConfirmator = () => {
    setShowConfirmator(false);
    setShowPassWordChanger(true);
  };

  const fireDeletion = async () => {
    await dispatch(deleteUserWithThunk(loggedUserName));
    setShowDeletionResult(true);
  };

  return (
    <StyledMyAccount>
      <StyledContainer $customMargin="2rem 0 0 1rem">
        <h1>{t("safety")}</h1>
        <p>{t("safety_intro")}</p>
        {showPasswordChanger && <PasswordUpdater />}
      </StyledContainer>
      <StyledContainer
        $customWidth="80%"
        $customDisplay="flex"
        $customMargin="2rem 2rem 0 0"
        $customJustifyContent="flex-end"
        $customFlexDirection="row"
      >
        {showPasswordChanger && (
          <RegularButton
            $customBorder="1px solid var(--error-2)"
            $customBackground="var(--error-2)"
            $customHoverColor="var(--text-100-d)"
            $customHoverBackgroundColor="var(--error-1)"
            $customFocusBackground="var(--error-1)"
            $customActiveBackground="var(--error-2)"
            onClick={handleShowConfirmator}
          >
            Delete my account
          </RegularButton>
        )}
        {showDeletionResult && (
          <CustomAlert variant={deletionMessageType}>
            {deletionMessage}
          </CustomAlert>
        )}
        <Confirmator
          hidden={showConfirmator}
          textValue="delete your account?"
          onConfirm={fireDeletion}
          sethiden={handleHideConfirmator}
        >
          Hola confirmator
        </Confirmator>
      </StyledContainer>
    </StyledMyAccount>
  );
};

export default Safety;

import { useState } from "react";
import Confirmator from "../../components/shared/Confirmator.jsx";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserWithThunk } from "../../store/userThunk.js";
import {
  getLoading,
  getLoggedUserName,
  getUIMessage,
  getUIState,
} from "../../store/selectors.js";
import { logout } from "../auth/service.js";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/shared/Alert.jsx";
import { resetUI } from "../../store/uiSlice.js";
import { resetLoggedUserInfo, setAuth } from "../../store/authSlice.js";
import { resetSinglePublicProfile } from "../../store/singlePublicProfileSlice.js";
import CustomPulseLoader from "../../components/shared/spinners/CustomPulseLoader.jsx";

const Deletion = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedUserName = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const [showConfirmator, setShowConfirmator] = useState(true);
  const [showDeletionResult, setShowDeletionResult] = useState(false);
  const deletionMessage = useSelector(getUIMessage);
  const deletionMessageType = useSelector(getUIState);
  const goBack = -1;
  const reloadPage = "true";
  const isLoading = useSelector(getLoading);
  const handleHideConfirmator = () => {
    setShowConfirmator(false);
  };

  const fireDeletion = async () => {
    await dispatch(deleteUserWithThunk(loggedUserName));
    setShowDeletionResult(true);
    if (deletionMessageType === "success") {
      const timer = setTimeout(() => {
        setShowDeletionResult(false);
        logout(reloadPage);
        dispatch(setAuth(false));
        dispatch(resetLoggedUserInfo());
        dispatch(resetSinglePublicProfile());
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowDeletionResult(false);
        dispatch(resetUI());
        navigate(goBack, { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      {showDeletionResult && (
        <CustomAlert
          variant={deletionMessageType === "success" ? "success" : "error"}
        >
          {deletionMessage}
        </CustomAlert>
      )}
      <Confirmator
        hidden={showConfirmator}
        textValue={t("delete_your_account")}
        onConfirm={fireDeletion}
        sethiden={handleHideConfirmator}
        $customBackground="var(--bg-100)"
        $customBorder="2px solid var(--error-2)"
        $blurerPosition="fixed"
        $blurerBackgroundColor="var(--primary-200)"
        goBack
      />
    </>
  );
};

export default Deletion;

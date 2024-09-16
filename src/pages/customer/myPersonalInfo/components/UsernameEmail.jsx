import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getLoggedUserName,
  getMyData,
} from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";

import { getMyDataWithThunk } from "../../../../store/MyPersonalData/myDataThunk";
import { validate } from "./userDataValidations";
import {
  resetValidationErrors,
  setValidations,
} from "../../../../store/MyPersonalData/myDataSlice";
import { resetUI, setMessage } from "../../../../store/uiSlice";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import { trimDate } from "../../../../utils/dateTools";
import CustomPulseLoader from "../../../../components/shared/spinners/CustomPulseLoader";
import { resetLoggedUserInfo, setAuth } from "../../../../store/authSlice";
import CustomAlert from "../../../../components/shared/Alert";
import { logout } from "../../../auth/service";
import { updateMyData } from "../userDataService";

const UsernameEmail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loggedUsername = useSelector(getLoggedUserName);
  const myData = useSelector(getMyData);
  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
  const isLoading = useSelector(getLoading);

  const languageCookieFormat = Cookies.get("formatLanguage") || "en";

  useEffect(() => {
    dispatch(getMyDataWithThunk(loggedUsername));
  }, [loggedUsername, dispatch]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      setShowSuccess(false);
    }
    const timer = setTimeout(() => {
      setShowError(false);
      //dispatch(resetValidationErrors());
    }, 3000);
    return () => clearTimeout(timer);
  }, [isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setShowError(false);
    }

    const timer = setTimeout(() => {
      //dispatch(emptyMyPassword());
      setShowSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (myData.updatedAt) {
      const trimmedDate = trimDate(myData.updatedAt, languageCookieFormat);
      setUpdateTime(trimmedDate);
    }

    setFormData({
      username: myData.username || "",
      email: myData.email || "",
    });
  }, [myData, languageCookieFormat]);

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
    dispatch(resetValidationErrors());

    const errors = validate(t, {
      username: formData.username,
      email: formData.email,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      setIsError(errorMessages);

      return;
    }

    try {
      const updateUsernameEmail = await updateMyData(loggedUsername, formData);
      setIsSuccess(updateUsernameEmail.message);
      dispatch(resetValidationErrors());
      setConfirmProcess(false);
      setEditMode(false);
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
    <>
      <StyledListContainer $customWidth="80%">
        {isLoading && (
          <CustomPulseLoader
            loading={isLoading.toString()}
            $customHeight="200px"
          />
        )}
        <ul key={myData._id}>
          {!isLoading && (
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <StyledListItem $customHeaderFontSize="1.5rem">
                <h3>{t("yourData")}</h3>
              </StyledListItem>

              <StyledContainer {...containerStyles}>
                {showSuccess && (
                  <CustomAlert variant="success">{isSuccess}</CustomAlert>
                )}
                {showError && (
                  <CustomAlert variant="error">{isError}</CustomAlert>
                )}

                <StyledListItem {...listItemStyles}>
                  <label>{t("nickname")}</label>
                  {!editMode ? (
                    <div>{myData.username}</div>
                  ) : (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder={t("nickname_placeholder")}
                    />
                  )}
                </StyledListItem>
              </StyledContainer>
              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("email")}</label>
                  {!editMode ? (
                    <div>{myData.email}</div>
                  ) : (
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("email_placeholder")}
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
                        {t("save_your_data")}
                      </RegularButton>
                      <RegularButton
                        $customMargin="2rem 0 0 0"
                        onClick={handleHideEditMode}
                      >
                        {t("back_to_saved_data")}
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
          )}
          <IconWrapper
            IconComponent={PersonCircle}
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
    </>
  );
};

export default UsernameEmail;

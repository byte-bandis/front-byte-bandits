import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getLoggedUserName,
  getMyData,
} from "../../../../store/selectors";
import { useEffect, useState } from "react";
import moment from "moment";
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

import {
  getMyDataWithThunk,
  updateMyDataWithThunk,
} from "../../../../store/MyPersonalData/myDataThunk";
import { validate } from "./userDataValidations";
import {
  resetValidationErrors,
  setValidations,
} from "../../../../store/MyPersonalData/myDataSlice";
import { resetUI, setMessage } from "../../../../store/uiSlice";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import { trimDate } from "../../../../utils/dateTools";
import CustomPulseLoader from "../../../../components/shared/spinners/CustomPulseLoader";

const MyData = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loggedUsername = useSelector(getLoggedUserName);
  const myData = useSelector(getMyData);
  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    birthdate: "",
    mobilePhoneNumber: "",
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
    if (myData.updatedAt) {
      const trimmedDate = trimDate(myData.updatedAt, languageCookieFormat);
      setUpdateTime(trimmedDate);
    }

    setFormData({
      username: myData.username || "",
      name: myData.name || "",
      lastname: myData.lastname || "",
      email: myData.email || "",
      mobilePhoneNumber: myData.mobilePhoneNumber || "",
      birthdate: myData.birthdate
        ? moment(myData.birthdate).format("YYYY-MM-DD")
        : "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(t, {
      name: formData.name,
      lastname: formData.lastname,
      username: myData.username,
      email: myData.email,
      birthdate: formData.birthdate,
      mobilePhoneNumber: formData.mobilePhoneNumber,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    dispatch(updateMyDataWithThunk({ username: loggedUsername, formData }));
    setConfirmProcess(false);
    setEditMode(false);
    dispatch(resetValidationErrors());
    dispatch(resetUI());
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
                <StyledListItem {...listItemStyles}>
                  <label>{t("nickname")}</label>
                  <div>{myData.username}</div>
                </StyledListItem>
              </StyledContainer>
              <StyledContainer {...containerStyles}>
                <StyledContainer
                  $customDisplay="flex"
                  $customFlexDirection="row"
                  $customGap="40px"
                >
                  <StyledListItem {...listItemStyles}>
                    <label>{t("name")}</label>
                    {!editMode ? (
                      <div>{myData.name}</div>
                    ) : (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("name_placeholder")}
                      />
                    )}
                  </StyledListItem>
                  <StyledListItem {...listItemStyles}>
                    <label>{t("lastname")}</label>
                    {!editMode ? (
                      <div>{myData.lastname}</div>
                    ) : (
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder={t("lastname_placeholder")}
                      />
                    )}
                  </StyledListItem>
                </StyledContainer>
              </StyledContainer>
              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("email")}</label>
                  <div>{myData.email}</div>
                </StyledListItem>
              </StyledContainer>

              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("phone")}</label>
                  {!editMode ? (
                    <div>{myData.mobilePhoneNumber}</div>
                  ) : (
                    <input
                      type="text"
                      name="mobilePhoneNumber"
                      value={formData.mobilePhoneNumber}
                      onChange={handleInputChange}
                      placeholder={t("phone_placeholder")}
                    />
                  )}
                </StyledListItem>
              </StyledContainer>

              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("birthdate")}</label>
                  {!editMode ? (
                    <div>{moment(myData.birthdate).format("DD-MM-YYYY")}</div>
                  ) : (
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      placeholder={t("birthdate_placeholder")}
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

export default MyData;

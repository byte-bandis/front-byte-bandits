import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyAddress } from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { MailboxFlag } from "react-bootstrap-icons";

import {
  getAddressWithThunk,
  updateMyAddressWithThunk,
} from "../../../../store/MyPersonalData/myAddressThunk";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";
import { validate } from "./addressValidations";
import {
  emptyMyAddress,
  setValidations,
} from "../../../../store/MyPersonalData/addressSlice";
import { resetMessage, setMessage } from "../../../../store/uiSlice";
import { resetValidationErrors } from "../../../../store/MyPersonalData/paymentSlice";
import countriesDB from "../../../../utils/countriesDB.json";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";

const Address = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Hook para las traducciones
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    streetName: "",
    streetNumber: "",
    flat: "",
    door: "",
    postalCode: "",
    city: "",
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

  const languageCookieFormat = Cookies.get("formatLanguage") || "en";

  useEffect(() => {
    if (loggedUsername === username) {
      dispatch(getAddressWithThunk(username));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    const countries = countriesDB.map((c) => c.name);
    setCountryList(countries);
  }, []);

  useEffect(() => {
    if (myAddress.updatedAt) {
      const trimmedDate = trimDate(myAddress.updatedAt, languageCookieFormat);
      setUpdateTime(trimmedDate);
    }

    setFormData({
      country: myAddress.country || "",
      streetName: myAddress.streetName || "",
      streetNumber: myAddress.streetNumber || "",
      flat: myAddress.flat || "",
      door: myAddress.door || "",
      postalCode: myAddress.postalCode || "",
      city: myAddress.city || "",
    });
  }, [myAddress, languageCookieFormat]);

  const handleShowEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleHideEditMode = (event) => {
    event.preventDefault();
    setEditMode(false);
  };

  const handleConfirmProcess = (event) => {
    event.preventDefault();
    setConfirmProcess(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validate(t, {
      country: formData.country,
      streetName: formData.streetName,
      streetNumber: formData.streetNumber,
      flat: formData.flat,
      door: formData.door,
      postalCode: formData.postalCode,
      city: formData.city,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    dispatch(updateMyAddressWithThunk({ username, formData }));
    setConfirmProcess(false);
    setEditMode(false);
    dispatch(resetMessage());
    dispatch(emptyMyAddress());
    dispatch(resetValidationErrors());
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <>
      <StyledListContainer $customWidth="80%">
        <ul key={myAddress._id}>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <StyledListItem $customHeaderFontSize="1.5rem">
              <h3>{t("postal_address")}</h3>
            </StyledListItem>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("street")}: </label>
                {!editMode ? (
                  <div>{myAddress.streetName}</div>
                ) : (
                  <input
                    type="text"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    placeholder={t("your_street_name")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("number")}:</label>
                {!editMode ? (
                  <div>{myAddress.streetNumber}</div>
                ) : (
                  <input
                    type="text"
                    name="streetNumber"
                    value={formData.streetNumber}
                    onChange={handleInputChange}
                    placeholder={t("your_street_number")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("flat")}:</label>
                {!editMode ? (
                  <div>{myAddress.flat}</div>
                ) : (
                  <input
                    type="text"
                    name="flat"
                    value={formData.flat}
                    onChange={handleInputChange}
                    placeholder={t("your_flat")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("door")}:</label>
                {!editMode ? (
                  <div>{myAddress.door}</div>
                ) : (
                  <input
                    type="text"
                    name="door"
                    value={formData.door}
                    onChange={handleInputChange}
                    placeholder={t("your_door")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("zip_code")}:</label>
                {!editMode ? (
                  <div>{myAddress.postalCode}</div>
                ) : (
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder={t("your_zip_code")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("city")}:</label>
                {!editMode ? (
                  <div>{myAddress.city}</div>
                ) : (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t("your_city")}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("country")}:</label>
                {!editMode ? (
                  <div>{myAddress.country}</div>
                ) : (
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder={t("your_country")}
                  >
                    <option
                      value=""
                      disabled
                    >
                      {t("select_your_country")}
                    </option>
                    {countryList.map((country) => (
                      <option
                        key={country}
                        value={country}
                      >
                        {country}
                      </option>
                    ))}
                  </select>
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
          <IconWrapper
            IconComponent={MailboxFlag}
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

export default Address;

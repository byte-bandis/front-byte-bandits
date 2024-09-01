import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyAddress } from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";

import { Postcard } from "react-bootstrap-icons";

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

const Address = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (loggedUsername === username) {
      dispatch(getAddressWithThunk(username));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    const countries = countriesDB.map((c) => c.name); // Extrae los nombres de los países
    setCountryList(countries); // Guarda los países en el estado
  }, []);

  useEffect(() => {
    if (myAddress.createdAt) {
      const trimmedDate = trimDate(myAddress.createdAt, "ES");
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
  }, [myAddress]);

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

    const errors = validate({
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
              <h3>Postal Address:</h3>
            </StyledListItem>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Street: </label>
                {!editMode ? (
                  <div>{myAddress.streetName}</div>
                ) : (
                  <input
                    type="text"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    placeholder="Your street name here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Number:</label>
                {!editMode ? (
                  <div>{myAddress.streetNumber}</div>
                ) : (
                  <input
                    type="text"
                    name="streetNumber"
                    value={formData.streetNumber}
                    onChange={handleInputChange}
                    placeholder="Your street number here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Flat:</label>
                {!editMode ? (
                  <div>{myAddress.flat}</div>
                ) : (
                  <input
                    type="text"
                    name="flat"
                    value={formData.flat}
                    onChange={handleInputChange}
                    placeholder="Your flat here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Door:</label>
                {!editMode ? (
                  <div>{myAddress.door}</div>
                ) : (
                  <input
                    type="text"
                    name="door"
                    value={formData.door}
                    onChange={handleInputChange}
                    placeholder="Your door here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Zip Code:</label>
                {!editMode ? (
                  <div>{myAddress.postalCode}</div>
                ) : (
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Your zip code here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>City:</label>
                {!editMode ? (
                  <div>{myAddress.city}</div>
                ) : (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Your city here"
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Country:</label>
                {!editMode ? (
                  <div>{myAddress.country}</div>
                ) : (
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Your country here"
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select your country
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
                      Save your data
                    </RegularButton>
                    <RegularButton
                      $customMargin="2rem 0 0 0"
                      onClick={handleHideEditMode}
                    >
                      Back to your saved data
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
          <Postcard
            width="25px"
            height="25px"
            color="var(--primary-200)"
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
            }}
          />
          {editMode && (
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <i>Last time you updated your data:</i>
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

import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserName,
  getMyAddress,
  getUIMessage,
  getUIState,
} from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";
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
import { Alert } from "react-bootstrap";

const Address = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    streetName: "",
    streetNumber: "",
    flat: "",
    door: "",
    postalCode: "",
    city: "",
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
      dispatch(getAddressWithThunk(username));
    }
  }, [username, loggedUsername, dispatch, uiState]);

  useEffect(() => {
    if (uiState === "success" && loggedUsername === username) {
      dispatch(getAddressWithThunk(loggedUsername));
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
  }, [uiState, username, loggedUsername, dispatch]);

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
    const formattedData = {
      ...formData,
      country: formData.country || "Your country",
      streetName: formData.streetName || "Your street name",
      streetNumber: formData.streetNumber || "Your street number",
      flat: formData.flat || "Your flat",
      door: formData.door || "Your door",
      postalCode: formData.postalCode || "Your zip code",
      city: formData.city || "Your city",
    };
    console.log("Esto es formdata de address: ", formData);
    dispatch(updateMyAddressWithThunk({ username, formData: formattedData }));
    setConfirmProcess(false);
    setEditMode(false);
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
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
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

import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyAddress } from "../../../../store/selectors";
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
  ConfirmAndSendButton,
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";

const Address = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);

  const [addressData, setAddressData] = useState({
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
    if (myAddress.createdAt) {
      const trimmedDate = trimDate(myAddress.createdAt, "ES");
      setCreationdate(trimmedDate);
    }

    setAddressData({
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledListContainer>
        <ul key={myAddress._id}>
          <form>
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
                    value={addressData.streetName}
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
                    value={addressData.streetNumber}
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
                    value={addressData.flat}
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
                    value={addressData.door}
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
                    value={addressData.postalCode}
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
                    value={addressData.city}
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
                    value={addressData.country}
                    onChange={handleInputChange}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            {editMode ? (
              <ButtonContainer $justifyContent="flex-start">
                <ConfirmAndSendButton
                  username={username}
                  formData={addressData}
                  requestedAction={updateMyAddressWithThunk}
                >
                  Save address
                </ConfirmAndSendButton>

                <RegularButton
                  $customMargin="2rem 0 0 0"
                  onClick={handleHideEditMode}
                >
                  Back to your saved address
                </RegularButton>
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
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <i>Address updated at:</i>
              <div>
                <i>{creationDate}</i>
              </div>
            </StyledListItem>
          </StyledContainer>
        </ul>
      </StyledListContainer>
    </>
  );
};

export default Address;

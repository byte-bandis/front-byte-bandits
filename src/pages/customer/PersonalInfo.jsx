import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../utils/dateTools";
import { getAddressWithThunk } from "../../store/MyPersonalData/myAddressThunk";
import { getMyAddress } from "../../store/selectors";
import {
  StyledListContainer,
  StyledListItem,
} from "../../components/shared/lists";
import StyledContainer from "../../components/shared/StyledContainer";
import SendConfirmedSelection from "../../components/shared/buttons/ConfirmationButton";
import RegularButton from "../../components/shared/buttons/RegularButton";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [country, setCountry] = useState(
    myAddress.country || "Please add a country"
  );
  const [streetName, setStreetName] = useState(
    myAddress.streetName || "Add your street name"
  );
  const [streetNumber, setStreetNumber] = useState(
    myAddress.streetNumber || "Add your street number"
  );
  const [flat, setFlat] = useState(myAddress.flat || "Add your flat number");
  const [door, setDoor] = useState(myAddress.door || "Add your flat door");
  const [postalCode, setPostalCode] = useState(
    myAddress.postalCode || "Add your postal code"
  );
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState(
    myAddress.mobilePhoneNumber || "123 123 123"
  );

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
  }, [myAddress]);

  return (
    <>
      <h1>These are your personal details</h1>
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
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
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
                    value={streetNumber}
                    onChange={(e) => setStreetNumber(e.target.value)}
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
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
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
                    value={door}
                    onChange={(e) => setDoor(e.target.value)}
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
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Phone Number:</label>
                {!editMode ? (
                  <div>{myAddress.mobilePhoneNumber}</div>
                ) : (
                  <input
                    type="text"
                    value={mobilePhoneNumber}
                    onChange={(e) => setMobilePhoneNumber(e.target.value)}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            {editMode ? (
              <SendConfirmedSelection>Save address</SendConfirmedSelection>
            ) : (
              <RegularButton $customMargin="2rem 0 0 0">
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

export default PersonalInfo;

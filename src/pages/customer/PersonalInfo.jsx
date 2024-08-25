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

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");

  const containerStyles = {
    $customDisplay: "flex",
    $customAlignItems: "flex-start",
    $customGap: "0",
    $customMarginTop: "1rem",
  };

  const listItemStyles = {
    $customDisplay: "flex",
    $customFlexDirection: "row",
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
          <StyledListItem>
            <h3>Postal Address:</h3>
          </StyledListItem>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Street: </h4>
              <div>{myAddress.streetName}</div>
            </StyledListItem>
          </StyledContainer>
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Number:</h4>
              <div>{myAddress.streetNumber}</div>
            </StyledListItem>
          </StyledContainer>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Flat:</h4>
              <div>{myAddress.flat}</div>
            </StyledListItem>
          </StyledContainer>
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Door:</h4>
              <div>{myAddress.door}</div>
            </StyledListItem>
          </StyledContainer>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Zip Code:</h4>
              <div>{myAddress.postalCode}</div>
            </StyledListItem>
          </StyledContainer>
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Country:</h4>
              <div>{myAddress.country}</div>
            </StyledListItem>
          </StyledContainer>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <h4>Updated on:</h4>
              <div>{creationDate}</div>
            </StyledListItem>
          </StyledContainer>
        </ul>
      </StyledListContainer>
    </>
  );
};

export default PersonalInfo;

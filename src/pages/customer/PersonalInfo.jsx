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

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myAddress = useSelector(getMyAddress);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");

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
          <StyledListItem>
            <h4>Street: </h4>
            <div>{myAddress.streetName}</div>
            <h4>Number:</h4>
            <div>{myAddress.streetNumber}</div>
          </StyledListItem>
          <StyledListItem>
            <h4>Flat:</h4>
            <div>{myAddress.flat}</div>
            <h4>Door:</h4>
            <div>{myAddress.door}</div>
          </StyledListItem>
          <StyledListItem>
            <h4>Zip Code:</h4>
            <div>{myAddress.postalCode}</div>
          </StyledListItem>
          <StyledListItem>
            <h4>Country:</h4>
            <div>{myAddress.country}</div>
          </StyledListItem>
          <StyledListItem>
            <h4>Updated on:</h4>
            <div>{creationDate}</div>
          </StyledListItem>
        </ul>
      </StyledListContainer>
    </>
  );
};

export default PersonalInfo;

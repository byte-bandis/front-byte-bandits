import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyAccount } from "../../store/selectors";
import { useEffect, useState } from "react";
import { getMyAccountWithThunk } from "../../store/profilesThunk";
import { useParams } from "react-router-dom";
import { trimDate } from "../../utils/dateTools";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myProfile = useSelector(getMyAccount);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");

  useEffect(() => {
    if (loggedUsername === username) {
      dispatch(getMyAccountWithThunk(username));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    if (myProfile.createdAt) {
      const trimmedDate = trimDate(myProfile.createdAt, "ES");
      setCreationdate(trimmedDate);
    }
  }, [myProfile]);

  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          <h3>This info is not public to other users</h3>
          <ul className="col-md-8 fs-4">
            <li>
              <b>Name:</b> {myProfile.name}
            </li>
            <li>
              <b>Lastname:</b> {myProfile.lastname}
            </li>
            <li>
              <b>E-mail:</b> {myProfile.email}
            </li>
            <li>
              <b>Address:</b> {myProfile.address}
            </li>
            <li>
              <b>Whishlist:</b> {myProfile.whishlist}
            </li>
            <li>
              <b>User created on:</b> {creationDate}
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};

export default PersonalInfo;

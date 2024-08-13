import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
} from "../../store/selectors";
import { useEffect } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const userPhoto = loadedPublicProfile.userPhoto;
  const headerPhoto = loadedPublicProfile.headerPhoto;
  const description = loadedPublicProfile.userDescription;

  useEffect(() => {
    if (!username) {
      dispatch(getSinglePublicProfileWithThunk(loggedUserName));
    } else {
      dispatch(getSinglePublicProfileWithThunk(username));
    }
  }, [loggedUserName, username, dispatch]);

  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          <ul className="col-md-8 fs-4">
            <li>{userPhoto}</li>
            <li>{headerPhoto}</li>
            <li>{description}</li>
          </ul>
        </div>
      </Col>
    </>
  );
};

export default Profile;

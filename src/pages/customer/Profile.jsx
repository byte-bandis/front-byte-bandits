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
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;
  //const fotoprueba = "super_mario_bros.jpg";
  //const userImage = userPhoto ? `${userPhoto}`

  const origin = import.meta.env.VITE_API_BASE_URL;

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
          {userPhoto && (
            <img
              src={userPhoto}
              alt={`${username}'s profile picture`}
              crossOrigin={origin}
            />
          )}
          {headerPhoto && (
            <img
              src={headerPhoto}
              alt={`${username}'s header picture`}
              crossOrigin={origin}
            />
          )}
          {userDescription && <div>{userDescription}</div>}
        </div>
      </Col>
    </>
  );
};

export default Profile;

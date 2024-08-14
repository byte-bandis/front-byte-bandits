import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
} from "../../store/selectors";
import { useEffect } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import PublicProfilePhotos from "./components/PublicProfilePhotos";
import DescriptionContainer from "./components/DescriptionContainer";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;

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
        <PublicProfilePhotos
          userPhoto={userPhoto}
          headerPhoto={headerPhoto}
          username={username}
          origin={origin}
        />
        {userDescription && (
          <DescriptionContainer>{userDescription}</DescriptionContainer>
        )}
      </Col>
    </>
  );
};

export default Profile;

import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
  getSinglePublicProfileOwner,
} from "../../store/selectors";
import { useEffect, useState } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import ScreenPublicProfile from "./components/ScreenPublicProfile";
import ProfileUpdaterForm from "./components/ProfileUpdaterForm";
import StyledContainer from "../../components/shared/StyledContainer";
import Button from "../product/components/Button";
import { checkAuthTokenSaved } from "../../utils/authUtils";

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const loadedPublicProfileOwner = useSelector(getSinglePublicProfileOwner);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;
  const [showForm, setShowForm] = useState(false);
  const origin = import.meta.env.VITE_API_BASE_URL;
  const token = checkAuthTokenSaved();

  useEffect(() => {
    if (token && loggedUserName === username) {
      dispatch(getSinglePublicProfileWithThunk(loggedUserName));
    }
  }, [token, loggedUserName, username, dispatch]);

  useEffect(() => {
    if (loggedUserName === username) {
      dispatch(getSinglePublicProfileWithThunk(loggedUserName));
    } else {
      dispatch(getSinglePublicProfileWithThunk(username));
    }
  }, [username, loggedUserName, dispatch]);

  useEffect(() => {
    if (Object.keys(loadedPublicProfile).length === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [loadedPublicProfile]);

  const handleShowForm = () => setShowForm(!showForm);

  return (
    <>
      <Col>
        {loadedPublicProfile && !showForm && (
          <StyledContainer>
            <ScreenPublicProfile
              userPhoto={userPhoto}
              headerPhoto={headerPhoto}
              username={username}
              origin={origin}
              userDescription={userDescription}
            />
            {loggedUserName === loadedPublicProfileOwner && (
              <Button onClick={handleShowForm}>Edit your profile</Button>
            )}
          </StyledContainer>
        )}

        {showForm && (
          <StyledContainer>
            <ProfileUpdaterForm />
            {loggedUserName === loadedPublicProfileOwner && (
              <Button onClick={handleShowForm}>Back</Button>
            )}
          </StyledContainer>
        )}
      </Col>
    </>
  );
};

export default Profile;

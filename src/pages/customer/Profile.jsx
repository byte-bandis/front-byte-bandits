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

const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const loadedPublicProfileOwner = useSelector(getSinglePublicProfileOwner);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;
  const [showForm, setShowForm] = useState(false);
  const [showScreen, setShowScreen] = useState(true);
  const origin = import.meta.env.VITE_API_BASE_URL;
  const userPhotoDefault = import.meta.env.VITE_USER_PHOTO_URL;
  const userHeaderDefault = import.meta.env.VITE_USER_HEADER_PHOTO_URL;

  console.log("Esto es showForm: ", showForm);
  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedUserName === username && showScreen) {
        await dispatch(getSinglePublicProfileWithThunk(loggedUserName));
      } else {
        await dispatch(getSinglePublicProfileWithThunk(username));
      }
    };
    fetchProfile();
  }, [dispatch, loggedUserName, username, showScreen]);

  useEffect(() => {
    if (Object.keys(loadedPublicProfile).length === 0) {
      setShowScreen(true);
    } else {
      setShowScreen(false);
    }
  }, [loadedPublicProfile]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Col>
        {loadedPublicProfile && !showForm && (
          <StyledContainer>
            <ScreenPublicProfile
              userPhoto={userPhoto || userPhotoDefault}
              headerPhoto={headerPhoto || userHeaderDefault}
              username={username}
              origin={origin}
              userDescription={userDescription}
            />
            {loggedUserName === username && (
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

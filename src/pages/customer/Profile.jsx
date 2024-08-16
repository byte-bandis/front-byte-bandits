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
  const [showForm, setsShowForm] = useState(false);
  const origin = import.meta.env.VITE_API_BASE_URL;

  console.log("Esto es loadedPublicProfile: ", loadedPublicProfile);
  useEffect(() => {
    if (!username) {
      dispatch(getSinglePublicProfileWithThunk(loggedUserName));
    } else {
      dispatch(getSinglePublicProfileWithThunk(username));
    }
  }, [loggedUserName, username, dispatch]);

  useEffect(() => {
    if (!loadedPublicProfile || Object.keys(loadedPublicProfile).length === 0) {
      setsShowForm(true);
    }
  }, [loadedPublicProfile]);

  const handleShowForm = () => setsShowForm(!showForm);

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

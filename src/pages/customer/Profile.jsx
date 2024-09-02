import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
} from "../../store/selectors";
import { useEffect, useState } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import ScreenPublicProfile from "./components/ScreenPublicProfile";
import ProfileUpdaterForm from "./components/ProfileUpdaterForm";
import StyledContainer from "../../components/shared/StyledContainer";
import { RegularButton } from "../../components/shared/buttons";
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const [showForm, setShowForm] = useState(false);
  const origin = import.meta.env.VITE_API_BASE_URL;
  //const userPhotoDefault = import.meta.env.VITE_USER_PHOTO_URL;
  //const userHeaderDefault = import.meta.env.VITE_USER_HEADER_PHOTO_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      if (loggedUserName === username) {
        await dispatch(getSinglePublicProfileWithThunk(loggedUserName));
      } else {
        await dispatch(getSinglePublicProfileWithThunk(username));
      }
    };
    fetchProfile();
  }, [dispatch, loggedUserName, username]);

  useEffect(() => {
    if (loadedPublicProfile) {
      setShowForm(false);
    }
  }, [loadedPublicProfile]);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <StyledContainer>
      {loadedPublicProfile && !showForm && (
        <StyledContainer>
          <ScreenPublicProfile
            userPhoto={loadedPublicProfile.userPhoto}
            headerPhoto={loadedPublicProfile.headerPhoto}
            username={username}
            origin={origin}
            userDescription={loadedPublicProfile.userDescription}
          />
          {loggedUserName === username && (
            <RegularButton onClick={handleShowForm}>
              {t("edit_your_profile")}
            </RegularButton>
          )}
        </StyledContainer>
      )}

      {showForm && (
        <StyledContainer>
          <ProfileUpdaterForm />
          <RegularButton onClick={handleShowForm}>{t("back")}</RegularButton>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default Profile;

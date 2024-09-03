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
import { returnSpecificProfile } from "../../utils/returnSpecificProfile";
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const [showForm, setShowForm] = useState(false);
  const origin = import.meta.env.VITE_API_BASE_URL;

  const matchedProfile = returnSpecificProfile(loadedPublicProfile, username);
  console.log("Esto es matched Profile: ", matchedProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(getSinglePublicProfileWithThunk(username));
    };
    fetchProfile();
  }, [dispatch, username]);

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
      {loadedPublicProfile && matchedProfile && !showForm && (
        <StyledContainer>
          <ScreenPublicProfile
            userPhoto={matchedProfile.userPhoto}
            headerPhoto={matchedProfile.headerPhoto}
            username={username}
            origin={origin}
            userDescription={matchedProfile.userDescription}
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

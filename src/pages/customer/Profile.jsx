import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLoggedUserName,
  getSinglePublicProfile,
  getUI,
} from "../../store/selectors";
import { useEffect, useState } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import ScreenPublicProfile from "./components/ScreenPublicProfile";
import ProfileUpdaterForm from "./components/ProfileUpdaterForm";
import StyledContainer from "../../components/shared/StyledContainer";
import { RegularButton } from "../../components/shared/buttons";
import { returnSpecificProfile } from "../../utils/returnSpecificProfile";
import { resetUI } from "../../store/uiSlice";
import CustomAlert from "../../components/shared/Alert";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { username } = useParams();
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const [showForm, setShowForm] = useState(false);
  const origin = import.meta.env.VITE_API_BASE_URL;
  const ui = useSelector(getUI);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const matchedProfile = returnSpecificProfile(loadedPublicProfile, username);
  const currentUrl = window.location.href;

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

  useEffect(() => {
    if (ui.state === "error") {
      setIsError(true);
    }
  }, [ui]);

  const handleCloseError = (event) => {
    event.preventDefault();
    setIsError(false);
    dispatch(resetUI());
    navigate(`/${loggedUserName}/info`);
  };

  return (
    <StyledContainer>
      {!currentUrl.endsWith(`${username}/info`) && (
        <StyledContainer $customMargin="15% 0 0 5%">
          <h2>{t("profile_owner", { username })}</h2>
        </StyledContainer>
      )}
      {isError && (
        <StyledContainer $customMargin="30% 0 0 20%">
          <CustomAlert
            variant="error"
            onClose={handleCloseError}
          >
            {ui.message ? ui.message : t("not_found")}
          </CustomAlert>
        </StyledContainer>
      )}
      {loadedPublicProfile && matchedProfile && !showForm && (
        <StyledContainer $customWidth="90%">
          <ScreenPublicProfile
            userPhoto={matchedProfile.userPhoto}
            headerPhoto={matchedProfile.headerPhoto}
            username={username}
            origin={origin}
            userDescription={
              matchedProfile.userDescription
                ? matchedProfile.userDescription
                : t("description_empty")
            }
          />
          {loggedUserName === username && (
            <RegularButton
              $customMargin="2rem 0 2rem 1rem"
              onClick={handleShowForm}
            >
              {t("edit_your_profile")}
            </RegularButton>
          )}
        </StyledContainer>
      )}

      {showForm && (
        <StyledContainer>
          <ProfileUpdaterForm />
          <RegularButton
            $customMargin="2rem 0 2rem 0"
            onClick={handleShowForm}
          >
            {t("back")}
          </RegularButton>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default Profile;

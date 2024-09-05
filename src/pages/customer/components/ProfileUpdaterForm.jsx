import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ImageUploader from "../../product/components/ImageUploader";
import {
  ButtonContainer,
  RegularButton,
} from "../../../components/shared/buttons";
import {
  getLoggedUserName,
  getSinglePublicProfile,
  getUI,
} from "../../../store/selectors";
import {
  getSinglePublicProfileWithThunk,
  updateSinglePublicProfileWithThunk,
} from "../../../store/profilesThunk";
import StyledTextarea from "../../../components/shared/StyledTextArea";
import Alert from "react-bootstrap/Alert";
import { resetUI } from "../../../store/uiSlice";
import { returnSpecificProfile } from "../../../utils/returnSpecificProfile";
import CustomPhoto from "../../../components/shared/CustomPhoto";
import StyledContainer from "../../../components/shared/StyledContainer";

const ProfileUpdaterForm = () => {
  const { t } = useTranslation();
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const dispatch = useDispatch();
  const { username } = useParams();
  const [inputUserPhoto, setInputUserPhoto] = useState(null);
  const [inputUserPhotoPreview, setInputUserPhotoPreview] = useState(null);
  const [inputHeaderPhoto, setInputHeaderPhoto] = useState(null);
  const [inputHeaderPhotoPreview, setInputHeaderPhotoPreview] = useState(null);
  const [newUserDescription, setNewUserDescription] = useState("");
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedUI = useSelector(getUI);
  const [showError, setShowError] = useState(false);
  const [editUserPhotoField, setEditUserPhotoField] = useState(false);
  const [editHeaderPhotoField, setEditHeaderPhotoField] = useState(false);
  const [cancelButton, setCancelButton] = useState({
    cancelEditUserPhoto: false,
    cancelEditHeaderPhoto: false,
  });

  const [cancelUserVisible, setCancelUserVisible] = useState(false);
  const [cancelHeaderVisible, setCancelHeaderVisible] = useState(false);

  const matchedProfile = returnSpecificProfile(
    loadedPublicProfile,
    loggedUserName
  );

  const handleNewDescription = (event) =>
    setNewUserDescription(event.target.value);

  useEffect(() => {
    if (loadedUI.state === "error") {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [loadedUI]);

  const handleAlertClose = () => {
    dispatch(resetUI());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (inputUserPhoto) {
      formData.append("userPhoto", inputUserPhoto);
    }

    if (inputHeaderPhoto) {
      formData.append("headerPhoto", inputHeaderPhoto);
    }

    formData.append("userDescription", newUserDescription);

    await dispatch(updateSinglePublicProfileWithThunk({ username, formData }));
    await dispatch(getSinglePublicProfileWithThunk(username));
  };

  const handleEditUserPhoto = (event) => {
    event.preventDefault();
    setEditUserPhotoField(true);
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditUserPhoto: true,
    }));
    setTimeout(() => setCancelUserVisible(true), 0);
  };

  const handleCancelEditUserPhoto = (event) => {
    event.preventDefault();
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditUserPhoto: false,
    }));
    setEditUserPhotoField(false);
    setCancelUserVisible(false);
  };

  const handleEditHeaderPhoto = (event) => {
    event.preventDefault();
    setEditHeaderPhotoField(true);
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditHeaderPhoto: true,
    }));
    setTimeout(() => setCancelHeaderVisible(true), 0);
  };

  const handleCancelEditHeaderPhoto = (event) => {
    event.preventDefault();
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditHeaderPhoto: false,
    }));
    setEditHeaderPhotoField(false);
    setCancelHeaderVisible(false);
  };

  return (
    <>
      {showError && (
        <Alert
          variant="danger"
          onClose={handleAlertClose}
          dismissible
        >
          {loadedUI.message}
        </Alert>
      )}
      <h2>{t("click_to_edit")}</h2>
      <StyledContainer
        $customBorder="1px dotted var(--primary-200)"
        $customBackground="var(--primary-400)"
        $customMargin="2rem 0 0 0"
      >
        <form>
          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="row"
            $customMargin="2rem"
            $customGap="2%"
            $customAlignItems="baseline"
          >
            {editUserPhotoField ? (
              <ImageUploader
                inputImagePreview={inputUserPhotoPreview}
                setInputImage={setInputUserPhoto}
                setInputImagePreview={setInputUserPhotoPreview}
                $customWidth={"200px"}
                $customHeight={"200px"}
                $customRadius={"50%"}
                $customWrapperZIndex={"1"}
                $customDropZoneShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"}
              />
            ) : (
              matchedProfile && (
                <CustomPhoto
                  src={matchedProfile.userPhoto}
                  alt={`${username}'s profile picture`}
                  crossOrigin={origin}
                  $customborderradius="50%"
                  $customwidth="200px"
                  $customheight="200px"
                  $customobjectfit="cover"
                  onClick={handleEditUserPhoto}
                  $customcursor="pointer"
                />
              )
            )}
            <RegularButton>Edit user photo</RegularButton>
            <RegularButton variant="danger">Delete photo</RegularButton>
            <RegularButton>Cancel edit</RegularButton>
            <RegularButton
              type="submit"
              variant="attention"
            >
              Send user photo
            </RegularButton>
          </StyledContainer>
        </form>
        <form>
          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="column"
            $customMargin="2rem"
            $customGap="5%"
            $customJustifyContent="flex-start"
            $customAlignItems="flex-start"
          >
            {editHeaderPhotoField ? (
              <ImageUploader
                inputImagePreview={inputHeaderPhotoPreview}
                setInputImage={setInputHeaderPhoto}
                setInputImagePreview={setInputHeaderPhotoPreview}
                $customWidth={"100%"}
                $customHeight={"300px"}
              />
            ) : (
              matchedProfile && (
                <CustomPhoto
                  src={matchedProfile.headerPhoto}
                  alt={`${username}'s header picture`}
                  crossOrigin={origin}
                  onClick={handleEditHeaderPhoto}
                  $customborder="none"
                  $customwidth="80%"
                  $customborderradius="8px"
                  $customboxshadow="none"
                  $customcursor="pointer"
                />
              )
            )}
            <ButtonContainer
              $marginContainer="2rem 0 0 0"
              $justifyContent="flex-start"
              $alignItems="flex-start"
              $gap="2%"
            >
              <RegularButton>Edit header photo</RegularButton>
              <RegularButton variant="danger">Delete photo</RegularButton>
              <RegularButton>Cancel edit</RegularButton>
              <RegularButton
                type="submit"
                variant="attention"
              >
                Send header photo
              </RegularButton>
            </ButtonContainer>
          </StyledContainer>
        </form>
        <form>
          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="column"
            $customMargin="2rem"
            $customGap="5%"
            $customJustifyContent="flex-start"
            $customAlignItems="flex-start"
          >
            <StyledTextarea
              value={newUserDescription}
              placeholder={
                matchedProfile &&
                matchedProfile.userDescription &&
                matchedProfile.userDescription.trim() !== ""
                  ? t("description_current", {
                      userDescription: matchedProfile.userDescription,
                    })
                  : t("description_empty")
              }
              onChange={handleNewDescription}
            />
            <ButtonContainer
              $marginContainer="2rem 0 0 0"
              $justifyContent="flex-start"
              $alignItems="flex-start"
              $gap="2%"
            >
              <RegularButton>Edit description</RegularButton>
              <RegularButton variant="danger">Delete description</RegularButton>
              <RegularButton>Cancel edit</RegularButton>
              <RegularButton
                type="submit"
                variant="attention"
              >
                Send description
              </RegularButton>
            </ButtonContainer>
          </StyledContainer>
        </form>
        {/*         {loggedUserName === username && (
          <RegularButton type="submit">{t("send_data")}</RegularButton>
        )} */}
      </StyledContainer>
    </>
  );
};

export default ProfileUpdaterForm;

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
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import IconWrapper from "../../../components/shared/iconsComponents/IconWrapper";

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
  const [userPhotoPreview, setUserPhotoPreview] = useState(null);
  const [userHeaderPreview, setUserHeaderPreview] = useState(null);
  const [editHeaderPhotoField, setEditHeaderPhotoField] = useState(false);
  const [requestDeleteUserPhoto, setRequestDeleteUserPhoto] = useState(false);
  const [requestDeleteHeaderPhoto, setRequestDeleteHeaderPhoto] =
    useState(false);
  const [showDeletionUserFlag, setShowDeletionUserFlag] = useState(false);
  const [showDeletionHeaderFlag, setShowDeletionHeaderFlag] = useState(false);
  const [showDeletionDescriptionFlag, setShowDeletionDescriptionFlag] =
    useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [cancelButton, setCancelButton] = useState({
    cancelEditUserPhoto: false,
    cancelEditHeaderPhoto: false,
  });

  const matchedProfile = returnSpecificProfile(
    loadedPublicProfile,
    loggedUserName
  );

  useEffect(() => {
    if (matchedProfile) {
      setNewUserDescription(matchedProfile.userDescription);
    }
  }, []);

  const handleNewDescription = (event) =>
    setNewUserDescription(event.target.value);

  const handleEditDescriptionButtons = (event) => {
    event.preventDefault();
    setEditDescription(true);
  };

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

  const handleCancelEditDescription = () => {
    setNewUserDescription(matchedProfile ? matchedProfile.userDescription : "");
    setEditDescription(false);
    setShowDeletionDescriptionFlag(false);
  };

  const handleDeleteUserPhoto = (event) => {
    event.preventDefault();
    setRequestDeleteUserPhoto(true);
    setShowDeletionUserFlag(true);
    setInputUserPhotoPreview(matchedProfile.userPhoto);
  };

  const handleDeleteHeaderPhoto = (event) => {
    event.preventDefault();
    setRequestDeleteHeaderPhoto(true);
    setShowDeletionHeaderFlag(true);
    setInputHeaderPhotoPreview(matchedProfile.headerPhoto);
  };

  const handleDeleteDescription = (event) => {
    event.preventDefault();
    setNewUserDescription("");
    setShowDeletionDescriptionFlag(true);
  };

  const handleEditUserPhoto = (event) => {
    event.preventDefault();
    setEditUserPhotoField(true);
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditUserPhoto: true,
    }));
  };

  const handleCancelEditUserPhoto = (event) => {
    event.preventDefault();
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditUserPhoto: false,
    }));
    setEditUserPhotoField(false);
    setShowDeletionUserFlag(false);
    setRequestDeleteUserPhoto(false);
    setUserPhotoPreview(matchedProfile.usePhoto);
    setInputUserPhotoPreview(null);
  };

  useEffect(() => {
    if (matchedProfile) {
      if (!requestDeleteUserPhoto) {
        setUserPhotoPreview(inputUserPhotoPreview);
      } else {
        setUserPhotoPreview(matchedProfile.userPhoto);
      }

      if (!requestDeleteHeaderPhoto) {
        setUserHeaderPreview(inputHeaderPhotoPreview);
      } else {
        setUserHeaderPreview(matchedProfile.headerPhoto);
      }

      if (cancelButton.cancelEditUserPhoto) {
        setUserPhotoPreview(inputUserPhotoPreview);
      }
      if (cancelButton.cancelEditHeaderPhoto) {
        setUserHeaderPreview(inputHeaderPhotoPreview);
      }
    }
  }, [
    requestDeleteUserPhoto,
    inputUserPhotoPreview,
    matchedProfile,
    requestDeleteHeaderPhoto,
    userHeaderPreview,
    inputHeaderPhotoPreview,
    cancelButton,
  ]);

  const handleEditHeaderPhoto = (event) => {
    event.preventDefault();
    setEditHeaderPhotoField(true);
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditHeaderPhoto: true,
    }));
  };

  const handleCancelEditHeaderPhoto = (event) => {
    event.preventDefault();
    setCancelButton((prevState) => ({
      ...prevState,
      cancelEditHeaderPhoto: false,
    }));
    setEditHeaderPhotoField(false);
    setRequestDeleteHeaderPhoto(false);
    setShowDeletionHeaderFlag(false);
    setUserHeaderPreview(matchedProfile.headerPhoto);
    setInputHeaderPhotoPreview(null);
  };

  useEffect(() => {
    if (matchedProfile && userPhotoPreview !== matchedProfile.userPhoto) {
      setShowDeletionUserFlag(false);
      setRequestDeleteUserPhoto(false);
    }
  }, [userPhotoPreview, matchedProfile]);

  useEffect(() => {
    if (matchedProfile && userHeaderPreview !== matchedProfile.headerPhoto) {
      setShowDeletionHeaderFlag(false);
      setRequestDeleteHeaderPhoto(false);
    }
  }, [userHeaderPreview, matchedProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (inputUserPhoto) {
      formData.append("userPhoto", inputUserPhoto);
      formData.append("deleteUserPhoto", requestDeleteUserPhoto);
    }

    if (inputHeaderPhoto) {
      formData.append("headerPhoto", inputHeaderPhoto);
      formData.append("deleteHeaderPhoto", requestDeleteHeaderPhoto);
    }

    formData.append("userDescription", newUserDescription);

    await dispatch(updateSinglePublicProfileWithThunk({ username, formData }));
    await dispatch(getSinglePublicProfileWithThunk(username));
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
        $customWidth="80%"
      >
        <form onSubmit={handleSubmit}>
          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="row"
            $customMargin="2rem"
            $customGap="2%"
            $customAlignItems="flex-end"
          >
            {editUserPhotoField ? (
              <StyledContainer
                $customDisplay="flex"
                $customFlexDirection="row"
                $customAlignItems="flex-end"
              >
                <StyledContainer $customWidth="25%">
                  <ImageUploader
                    inputImagePreview={userPhotoPreview}
                    setInputImage={setInputUserPhoto}
                    setInputImagePreview={setInputUserPhotoPreview}
                    $customWidth={"200px"}
                    $customHeight={"200px"}
                    $customRadius={"50%"}
                    $customWrapperZIndex={"1"}
                    $customDropZoneShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"}
                    $showRemoveBtn={false}
                  />
                </StyledContainer>
                <StyledContainer>
                  {showDeletionUserFlag ? (
                    <StyledContainer
                      $customDisplay="flex"
                      $customFlexDirection="row"
                      $customGap="2%"
                      $customMargin="0 0 2rem 0"
                    >
                      <IconWrapper
                        IconComponent={ArrowLeftCircleFill}
                        size="50px"
                        color="var(--error-1)"
                        top="0"
                        right="0"
                        style={{ position: "relative" }}
                      />
                      Photo marked for deletion
                    </StyledContainer>
                  ) : (
                    <StyledContainer
                      $customDisplay="flex"
                      $customFlexDirection="row"
                      $customGap="2%"
                      $customMargin="0 0 2rem 0"
                    >
                      <IconWrapper
                        IconComponent={ArrowLeftCircleFill}
                        size="50px"
                        color="var(--primary-200)"
                        top="0"
                        right="0"
                        style={{ position: "relative" }}
                      />
                      {t("click_photo_to_edit")}
                    </StyledContainer>
                  )}
                  <ButtonContainer
                    $marginContainer="0 0 0 0"
                    $justifyContent="flex-start"
                    $gap="2%"
                  >
                    {editUserPhotoField && (
                      <>
                        <RegularButton onClick={handleCancelEditUserPhoto}>
                          Cancel edit
                        </RegularButton>
                        <RegularButton
                          variant="danger"
                          onClick={handleDeleteUserPhoto}
                        >
                          Delete photo
                        </RegularButton>
                      </>
                    )}
                  </ButtonContainer>
                </StyledContainer>
              </StyledContainer>
            ) : (
              matchedProfile && (
                <StyledContainer
                  $customDisplay="flex"
                  $customFlexDirection="row"
                  $customAlignItems="center"
                  $customGap="5%"
                >
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
                  <StyledContainer
                    $customDisplay="flex"
                    $customFlexDirection="row"
                    $customGap="2%"
                    $customAlignItems="center"
                    $customWidth="50%"
                  >
                    <IconWrapper
                      IconComponent={ArrowLeftCircleFill}
                      size="50px"
                      color="var(--primary-200)"
                      top="0"
                      right="0"
                      style={{ position: "relative" }}
                    />
                    {t("click_photo_to_edit")}
                  </StyledContainer>
                </StyledContainer>
              )
            )}
          </StyledContainer>

          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="column"
            $customMargin="2rem"
            $customGap="5%"
            $customJustifyContent="flex-start"
            $customAlignItems="flex-start"
          >
            {editHeaderPhotoField ? (
              <StyledContainer $customWidth="100%">
                <StyledContainer
                  $customWidth="100%"
                  $customDisplay="flex"
                  $customFlexDirection="row"
                >
                  <ImageUploader
                    inputImagePreview={userHeaderPreview}
                    setInputImage={setInputHeaderPhoto}
                    setInputImagePreview={setInputHeaderPhotoPreview}
                    $customWidth={"90%"}
                    $customHeight={"400px"}
                    $showRemoveBtn={false}
                  />
                  {showDeletionHeaderFlag ? (
                    <StyledContainer
                      $customDisplay="flex"
                      $customFlexDirection="row"
                      $customGap="2%"
                      $customMargin="0 0 0 2rem"
                      $customWidth="50%"
                    >
                      <IconWrapper
                        IconComponent={ArrowLeftCircleFill}
                        size="50px"
                        color="var(--error-1)"
                        top="0"
                        right="0"
                        style={{ position: "relative" }}
                      />
                      Photo marked for deletion
                    </StyledContainer>
                  ) : (
                    <StyledContainer
                      $customDisplay="flex"
                      $customFlexDirection="row"
                      $customGap="5%"
                      $customMargin="0 0 0 2rem"
                      $customWidth="50%"
                    >
                      <IconWrapper
                        IconComponent={ArrowLeftCircleFill}
                        size="50px"
                        color="var(--primary-200)"
                        top="0"
                        right="0"
                        style={{ position: "relative" }}
                      />
                      {t("click_photo_to_edit")}
                    </StyledContainer>
                  )}
                </StyledContainer>
                <ButtonContainer
                  $marginContainer="2rem 0 0 0"
                  $justifyContent="flex-start"
                  $alignItems="flex-start"
                  $gap="2%"
                >
                  <RegularButton onClick={handleCancelEditHeaderPhoto}>
                    Cancel edit
                  </RegularButton>
                  <RegularButton
                    variant="danger"
                    onClick={handleDeleteHeaderPhoto}
                  >
                    Delete photo
                  </RegularButton>
                </ButtonContainer>
              </StyledContainer>
            ) : (
              matchedProfile && (
                <StyledContainer
                  $customDisplay="flex"
                  $customFlexDirection="row"
                  $customWidth="90%"
                >
                  <CustomPhoto
                    src={matchedProfile.headerPhoto}
                    alt={`${username}'s header picture`}
                    crossOrigin={origin}
                    onClick={handleEditHeaderPhoto}
                    $customborder="none"
                    $customwidth="70%"
                    $customborderradius="8px"
                    $customboxshadow="none"
                    $customcursor="pointer"
                  />
                  <StyledContainer
                    $customDisplay="flex"
                    $customFlexDirection="row"
                    $customGap="5%"
                    $customMargin="0 0 0 2rem"
                  >
                    <IconWrapper
                      IconComponent={ArrowLeftCircleFill}
                      size="50px"
                      color="var(--primary-200)"
                      top="0"
                      right="0"
                      style={{ position: "relative" }}
                    />
                    {t("click_photo_to_edit")}
                  </StyledContainer>
                </StyledContainer>
              )
            )}
          </StyledContainer>

          <StyledContainer
            $customDisplay="flex"
            $customFlexDirection="column"
            $customMargin="2rem"
            $customGap="5%"
            $customJustifyContent="flex-start"
            $customAlignItems="flex-start"
          >
            <StyledContainer
              $customDisplay="flex"
              $customFlexDirection="row"
              $customWidth="90%"
              $customGap="5%"
            >
              <StyledTextarea
                $customWidth="100%"
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
                onClick={handleEditDescriptionButtons}
              />
              {!showDeletionDescriptionFlag ? (
                <StyledContainer
                  $customDisplay="flex"
                  $customFlexDirection="row"
                  $customGap="2%"
                  $customWidth="60%"
                >
                  <IconWrapper
                    IconComponent={ArrowLeftCircleFill}
                    size="50px"
                    color="var(--primary-200)"
                    top="0"
                    right="0"
                    style={{ position: "relative" }}
                  />
                  {t("click_to_edit")}
                </StyledContainer>
              ) : (
                <StyledContainer
                  $customDisplay="flex"
                  $customFlexDirection="row"
                  $customGap="2%"
                  $customWidth="60%"
                >
                  <IconWrapper
                    IconComponent={ArrowLeftCircleFill}
                    size="50px"
                    color="var(--error-2)"
                    top="0"
                    right="0"
                    style={{ position: "relative" }}
                  />
                  Description will be deleted
                </StyledContainer>
              )}
            </StyledContainer>

            {editDescription && (
              <ButtonContainer
                $marginContainer="2rem 0 0 0"
                $justifyContent="flex-start"
                $alignItems="flex-start"
                $gap="2%"
              >
                <RegularButton onClick={handleCancelEditDescription}>
                  Cancel edit
                </RegularButton>
                <RegularButton
                  onClick={handleDeleteDescription}
                  variant="danger"
                >
                  Delete description
                </RegularButton>
              </ButtonContainer>
            )}
          </StyledContainer>
        </form>
        {loggedUserName === username && (
          <RegularButton
            variant="attention"
            $customMargin="2rem"
            type="submit"
            onClick={handleSubmit}
          >
            {t("send_data")}
          </RegularButton>
        )}
      </StyledContainer>
    </>
  );
};

export default ProfileUpdaterForm;

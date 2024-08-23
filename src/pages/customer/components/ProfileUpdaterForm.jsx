import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import StyledForm from "../../../components/shared/StyledForm";
import PhotosContainer from "./PhotosContainer";
import Alert from "react-bootstrap/Alert";
import { resetUI } from "../../../store/uiSlice";
import ProfileUserPhoto from "./ProfileUserPhoto";
import HeaderProfilePhoto from "./HeaderProfilePhoto";
import CustomCancelOption from "../../../components/shared/CustomCancelOption";

const ProfileUpdaterForm = () => {
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;
  const dispatch = useDispatch();
  const { username } = useParams();
  const [inputUserPhoto, setInputUserPhoto] = useState(null);
  const [inputUserPhotoPreview, setInputUserPhotoPreview] = useState(null);
  const [inputHeaderPhoto, setInputHeaderPhoto] = useState(null);
  const [inputHeaderPhotoPreview, setInputHeaderPhotoPreview] = useState(null);
  const [newUserDescription, setNewUserDescription] = useState(
    userDescription || ""
  );
  const loggedUserName = useSelector(getLoggedUserName);
  const loadedUI = useSelector(getUI);
  const [showError, setShowError] = useState(false);
  const [editField, setEditField] = useState(null);
  const [cancelButton, setCancelButton] = useState({
    cancelEditUserPhoto: false,
    cancelEditHeaderPhoto: false,
    cancelUserPhotoVisible: false,
    cancelHeaderPhotoVisible: false,
  });

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
  }, [loadedUI, setShowError]);

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

  const handleEditPhoto = (photoType) => (event) => {
    event.preventDefault();
    setEditField(photoType);
    setCancelButton((prevState) => ({
      ...prevState,
      [`cancelEdit${photoType}`]: true,
      [`cancel${photoType}Visible`]: true,
    }));
  };

  const handleCancelEditPhoto = (photoType) => (event) => {
    event.preventDefault();
    setCancelButton((prevState) => ({
      ...prevState,
      [`cancelEdit${photoType}`]: false,
      [`cancel${photoType}Visible`]: false,
    }));
    setEditField(null);
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
      <h2>Click on a field to edit</h2>
      <StyledForm
        onSubmit={handleSubmit}
        $customAlignItems={"left"}
        $customMaxWidth={"100%"}
      >
        <PhotosContainer>
          {editField === "UserPhoto" ? (
            <ImageUploader
              inputImagePreview={inputUserPhotoPreview}
              setInputImage={setInputUserPhoto}
              setInputImagePreview={setInputUserPhotoPreview}
              $customWidth={"200px"}
              $customHeight={"200px"}
              $customRadius={"50%"}
              $customWrapperPosition={"absolute"}
              $customWrapperTop={"-25px"}
              $customWrapperZIndex={"1"}
              $customDropZoneShadow={"0px 4px 8px rgba(0, 0, 0, 0.2)"}
            />
          ) : (
            <ProfileUserPhoto
              src={userPhoto}
              alt={`${username}'s profile picture`}
              crossOrigin={origin}
              $customborderradius="50%"
              $customwidth="200px"
              $customheight="200px"
              $customobjectfit="cover"
              $customZIndex="1"
              onClick={handleEditPhoto("UserPhoto")}
            />
          )}
          {cancelButton.cancelEditUserPhoto && (
            <CustomCancelOption
              $isVisible={cancelButton.cancelUserPhotoVisible}
              onClick={handleCancelEditPhoto("UserPhoto")}
              $customposition="absolute"
              $customborder="none"
              $customborderradius="8px"
              $customZIndex="2"
              $customboxshadow="none"
              $customtransform="none"
              $customtop="10%"
              $customleft="25%"
            >
              Click here to cancel
            </CustomCancelOption>
          )}
          {editField === "HeaderPhoto" ? (
            <ImageUploader
              inputImagePreview={inputHeaderPhotoPreview}
              setInputImage={setInputHeaderPhoto}
              setInputImagePreview={setInputHeaderPhotoPreview}
              $customWidth={"100%"}
              $customHeight={"300px"}
              $customWrapperPosition={"relative"}
            />
          ) : (
            <HeaderProfilePhoto
              src={headerPhoto}
              alt={`${username}'s header picture`}
              crossOrigin={origin}
              onClick={handleEditPhoto("HeaderPhoto")}
              $customborder="none"
              $customboxshadow="none"
              $customcursor="pointer"
            />
          )}
          {cancelButton.cancelEditHeaderPhoto && (
            <CustomCancelOption
              $isVisible={cancelButton.cancelHeaderPhotoVisible}
              onClick={handleCancelEditPhoto("HeaderPhoto")}
              $customposition="absolute"
              $customborder="none"
              $customborderradius="8px"
              $customZIndex="2"
              $customboxshadow="none"
              $customtransform="none"
              $customtop="70%"
              $customleft="70%"
            >
              Click here to cancel
            </CustomCancelOption>
          )}
        </PhotosContainer>
        <StyledTextarea
          value={newUserDescription}
          placeholder={`${
            userDescription && userDescription.trim() !== ""
              ? `Currently: "${userDescription}". Write here to modify your description. Or leave this field empty if you like.`
              : "Your description is empty so far. Write something about you and your work here."
          }`}
          onChange={handleNewDescription}
        />
        {loggedUserName === username && (
          <>
            <Button type="submit">Send data</Button>
          </>
        )}
      </StyledForm>
    </>
  );
};

export default ProfileUpdaterForm;

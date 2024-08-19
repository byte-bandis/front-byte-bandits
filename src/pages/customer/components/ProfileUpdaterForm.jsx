import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserId,
  getLoggedUserName,
  getSinglePublicProfile,
  getUI,
} from "../../../store/selectors";
import {
  createSinglePublicProfileWithThunk,
  getSinglePublicProfileWithThunk,
  updateSinglePublicProfileWithThunk,
} from "../../../store/profilesThunk";
import StyledTextarea from "../../../components/shared/StyledTextArea";
import StyledForm from "../../../components/shared/StyledForm";
import PhotosContainer from "./PhotosContainer";
import urlCleaner from "../../../utils/urlCleaner";
import Alert from "react-bootstrap/Alert";
import { resetUI } from "../../../store/uiSlice";
import ProfileUserPhoto from "./ProfileUserPhoto";
import HeaderProfilePhoto from "./HeaderProfilePhoto";
import CustomCancelOption from "../../../components/shared/CancelOption";

const ProfileUpdaterForm = () => {
  const loadedPublicProfile = useSelector(getSinglePublicProfile);
  const { userPhoto, headerPhoto, userDescription } = loadedPublicProfile;
  const dispatch = useDispatch();
  const requesterId = useSelector(getLoggedUserId);
  const { username } = useParams();
  const [inputUserPhoto, setInputUserPhoto] = useState(null);
  const [inputUserPhotoPreview, setInputUserPhotoPreview] = useState(null);
  const [inputHeaderPhoto, setInputHeaderPhoto] = useState(null);
  const [inputHeaderPhotoPreview, setInputHeaderPhotoPreview] = useState(null);
  const [newUserDescription, setNewUserDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
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

  useEffect(() => {
    if (Object.values(loadedPublicProfile).length === 0) {
      setEditMode(false);
      console.log("Esto es ObjectValues: ", Object.values(loadedPublicProfile));
      console.log("Esto es editMode: ", editMode);
    } else {
      setEditMode(true);
      console.log("Esto es editMode: ", editMode);
    }
  }, [loadedPublicProfile, editMode]);

  useEffect(() => {
    if (loadedUI.state === "error") {
      setShowError(true);
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
    formData.append("requesterId", requesterId);

    if (userPhoto) {
      if (inputUserPhoto && inputUserPhoto !== urlCleaner(userPhoto)) {
        formData.append("userPhoto", inputUserPhoto);
      }
    } else {
      formData.append("userPhoto", inputUserPhoto);
    }

    if (headerPhoto) {
      if (inputHeaderPhoto && inputHeaderPhoto !== urlCleaner(headerPhoto)) {
        formData.append("headerPhoto", inputHeaderPhoto);
      }
    } else {
      formData.append("headerPhoto", inputHeaderPhoto);
    }

    if (userDescription) {
      if (newUserDescription && newUserDescription !== userDescription) {
        formData.append("userDescription", newUserDescription);
      }
    } else {
      formData.append("userDescription", newUserDescription);
    }

    if (!editMode) {
      await dispatch(
        createSinglePublicProfileWithThunk({ username, formData })
      );
    } else {
      await dispatch(
        updateSinglePublicProfileWithThunk({ username, formData })
      );
    }
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
      <h2>Click on a field to edit</h2>
      <StyledForm
        onSubmit={handleSubmit}
        $customAlignItems={"left"}
        $customMaxWidth={"100%"}
      >
        <PhotosContainer>
          {editUserPhotoField || !editMode ? (
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
              onClick={handleEditUserPhoto}
            />
          )}
          {cancelButton.cancelEditUserPhoto && (
            <CustomCancelOption
              isVisible={cancelUserVisible}
              onClick={handleCancelEditUserPhoto}
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
          {editHeaderPhotoField || !editMode ? (
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
              onClick={handleEditHeaderPhoto}
              $customborder="none"
              $customboxshadow="none"
              $customcursor="pointer"
            />
          )}
          {cancelButton.cancelEditHeaderPhoto && (
            <CustomCancelOption
              isVisible={cancelHeaderVisible}
              onClick={handleCancelEditHeaderPhoto}
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
          placeholder={
            userDescription || "Write something about you and your work here"
          }
          onChange={(e) => setNewUserDescription(e.target.value)}
        />
        {loggedUserName === username && (
          <Button type="submit">Send data</Button>
        )}
      </StyledForm>
    </>
  );
};

export default ProfileUpdaterForm;

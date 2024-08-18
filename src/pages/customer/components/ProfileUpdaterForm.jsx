import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserId,
  getLoggedUserName,
  getSinglePublicProfile,
  getUIState,
} from "../../../store/selectors";
import {
  createSinglePublicProfileWithThunk,
  getSinglePublicProfileWithThunk,
} from "../../../store/profilesThunk";
import StyledTextarea from "../../../components/shared/StyledTextArea";
import StyledForm from "../../../components/shared/StyledForm";
import PhotosContainer from "./PhotosContainer";
import { updateSinglePublicProfile } from "../service";
import urlCleaner from "../../../utils/urlCleaner";

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
  const success = useSelector(getUIState);

  useEffect(() => {
    if (Object.values(loadedPublicProfile).length === 0) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, [loadedPublicProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("requesterId", requesterId);
    if (userPhoto) {
      if (inputUserPhoto && inputUserPhoto !== urlCleaner(userPhoto)) {
        formData.append("userPhoto", inputUserPhoto);
      }
    }
    if (headerPhoto) {
      if (inputHeaderPhoto && inputHeaderPhoto !== urlCleaner(headerPhoto)) {
        formData.append("headerPhoto", inputHeaderPhoto);
      }
    }
    if (userDescription) {
      if (newUserDescription && newUserDescription !== userDescription) {
        formData.append("userDescription", newUserDescription);
      }
    }

    if (!editMode) {
      await dispatch(
        createSinglePublicProfileWithThunk({ username, formData })
      );
    } else {
      await updateSinglePublicProfile(username, formData);
    }
    await dispatch(getSinglePublicProfileWithThunk(username));
  };

  return (
    <StyledForm
      onSubmit={handleSubmit}
      $customAlignItems={"left"}
      $customMaxWidth={"100%"}
    >
      <PhotosContainer>
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
        />
        <ImageUploader
          inputImagePreview={inputHeaderPhotoPreview}
          setInputImage={setInputHeaderPhoto}
          setInputImagePreview={setInputHeaderPhotoPreview}
          $customWidth={"100%"}
          $customHeight={"300px"}
          $customWrapperPosition={"relative"}
        />
      </PhotosContainer>
      <StyledTextarea
        value={newUserDescription}
        placeholder={
          userDescription || "Write something about you and your work here"
        }
        onChange={(e) => setNewUserDescription(e.target.value)}
      />
      {loggedUserName === username && <Button type="submit">Send data</Button>}
    </StyledForm>
  );
};

export default ProfileUpdaterForm;

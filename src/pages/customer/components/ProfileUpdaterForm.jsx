import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserId,
  getSinglePublicProfile,
} from "../../../store/selectors";
import {
  createSinglePublicProfileWithThunk,
  getSinglePublicProfileWithThunk,
} from "../../../store/profilesThunk";
import StyledTextarea from "../../../components/shared/StyledTextArea";
import StyledForm from "../../../components/shared/StyledForm";
import PhotosContainer from "./PhotosContainer";

const ProfileUpdaterForm = () => {
  const { userPhoto, headerPhoto, userDescription } = useSelector(
    getSinglePublicProfile
  );
  const dispatch = useDispatch();
  const requesterId = useSelector(getLoggedUserId);
  const { username } = useParams();
  const [inputUserPhoto, setInputUserPhoto] = useState(null);
  const [inputUserPhotoPreview, setInputUserPhotoPreview] = useState(null);
  const [inputHeaderPhoto, setInputHeaderPhoto] = useState(null);
  const [inputHeaderPhotoPreview, setInputHeaderPhotoPreview] = useState(null);
  const [newUserDescription, setNewUserDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("requesterId", requesterId);

    if (inputUserPhoto && inputUserPhoto !== userPhoto) {
      formData.append("userPhoto", inputUserPhoto);
    }
    if (inputHeaderPhoto && inputHeaderPhoto !== headerPhoto) {
      formData.append("headerPhoto", inputHeaderPhoto);
    }
    if (newUserDescription && newUserDescription !== userDescription) {
      formData.append("userDescription", newUserDescription);
    }
    await dispatch(createSinglePublicProfileWithThunk({ username, formData }));
    dispatch(getSinglePublicProfileWithThunk(username));
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
      <Button type="submit">Send data</Button>
    </StyledForm>
  );
};

export default ProfileUpdaterForm;

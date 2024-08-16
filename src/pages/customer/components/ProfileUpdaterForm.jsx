import styled from "styled-components";
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

const PublicProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #f9f9f9;
`;

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
    <PublicProfileForm onSubmit={handleSubmit}>
      <ImageUploader
        inputImagePreview={inputUserPhotoPreview}
        setInputImage={setInputUserPhoto}
        setInputImagePreview={setInputUserPhotoPreview}
        $customWidth={"200px"}
        $customHeight={"200px"}
        $customRadius={"50%"}
      />
      <ImageUploader
        inputImagePreview={inputHeaderPhotoPreview}
        setInputImage={setInputHeaderPhoto}
        setInputImagePreview={setInputHeaderPhotoPreview}
        $customWidth={"100%"}
        $customHeight={"300px"}
      />
      <StyledTextarea
        value={newUserDescription}
        placeholder={
          userDescription || "Write something about you and your work here"
        }
        onChange={(e) => setNewUserDescription(e.target.value)}
      />
      <Button type="submit">Send data</Button>
    </PublicProfileForm>
  );
};

export default ProfileUpdaterForm;

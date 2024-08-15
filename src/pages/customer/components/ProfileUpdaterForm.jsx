import styled from "styled-components";
import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSinglePublicProfile } from "../../../store/selectors";

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

  const [inputUserPhoto, setInputUserPhoto] = useState(null);
  const [inputUserPhotoPreview, setInputUserPhotoPreview] = useState(null);
  const [inputHeaderPhoto, setInputHeaderPhoto] = useState(null);
  const [inputHeaderPhotoPreview, setInputHeaderPhotoPreview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (inputUserPhoto && inputUserPhoto !== userPhoto) {
      formData.append("userPhoto", inputUserPhoto);
      setInputUserPhotoPreview(inputUserPhoto);
    }
    if (inputHeaderPhoto && inputHeaderPhoto !== headerPhoto) {
      formData.append("headerPhoto", inputHeaderPhoto);
      setInputHeaderPhotoPreview(inputHeaderPhoto);
    }
  };

  return (
    <PublicProfileForm>
      <ImageUploader
        inputImagePreview={inputUserPhotoPreview}
        setInputImage={setInputUserPhoto}
        setInputImagePreview={setInputUserPhotoPreview}
        $customWidth={"200px"}
        $customHeight={"200px"}
        $customRadius={"50%"}
      />
      <ImageUploader
        inputImagePreview={inputHeaderPhotoPreview || headerPhoto}
        setInputImage={setInputHeaderPhoto}
        setInputImagePreview={setInputHeaderPhotoPreview}
        $customWidth={"100%"}
        $customHeight={"300px"}
      />
      <StyledTextarea
        type="textarea"
        placeholder={
          userDescription || "Write something about you and your work here"
        }
      />
      <Button type="submit">Send data</Button>
    </PublicProfileForm>
  );
};

export default ProfileUpdaterForm;

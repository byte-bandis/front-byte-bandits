import styled from "styled-components";
import ImageUploader from "../../product/components/ImageUploader";
import Button from "../../product/components/Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
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

  console.log("Esto es userPhoto en el form: ", userPhoto);
  console.log("Esto es headerPhoto en el form: ", headerPhoto);
  console.log("Esto es userDescription en el form: ", userDescription);

  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
  };

  return (
    <PublicProfileForm>
      <ImageUploader
        $customWidth={"200px"}
        $customHeight={"200px"}
        $customRadius={"50%"}
      />
      <ImageUploader
        $customWidth={"100%"}
        $customHeight={"300px"}
      />
      <StyledTextarea
        type="textarea"
        placeholder={
          userDescription || "Write something about you and your work here"
        }
      />
      <Button>Send data</Button>
    </PublicProfileForm>
  );
};

export default ProfileUpdaterForm;

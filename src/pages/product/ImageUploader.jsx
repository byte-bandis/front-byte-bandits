import React from "react";
import { Form } from "react-bootstrap";
import {
  DropZone,
  ImagePreview,
  ImagePreviewImg,
  CustomFileUpload,
  RemoveBtn,
  FileInput,
} from "./ImageUploaderStyles";

const ImageUploader = ({
  inputImage,
  inputImagePreview,
  setInputImage,
  setInputImagePreview,
  dropAreaText = "Arrastra y suelta aquí o haz clic para seleccionar una imagen",
  labelText = "Foto",
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImageFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const setImageFile = (file) => {
    setInputImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setInputImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setInputImage(null);
    setInputImagePreview("");
  };

  return (
    <div className="mb-2">
      <Form.Label>{labelText}</Form.Label>
      <DropZone onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {inputImagePreview ? (
          <ImagePreview>
            <ImagePreviewImg src={inputImagePreview} alt="Product Preview" />
            <RemoveBtn onClick={handleRemoveImage}>✕</RemoveBtn>
          </ImagePreview>
        ) : (
          <CustomFileUpload>
            <FileInput type="file" onChange={handleImageChange} />
            {dropAreaText}
          </CustomFileUpload>
        )}
      </DropZone>
    </div>
  );
};

export default ImageUploader;

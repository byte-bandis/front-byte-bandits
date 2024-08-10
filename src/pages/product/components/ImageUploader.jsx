import React from "react";
import PropTypes from "prop-types";
import { CameraFill } from "react-bootstrap-icons";
import {
  DropZoneWrapper,
  DropZone,
  ImagePreview,
  ImagePreviewImg,
  CustomFileUpload,
  RemoveBtn,
  FileInput,
} from "./ImageUploaderStyles";

const ImageUploader = ({
  inputImagePreview,
  setInputImage,
  setInputImagePreview,
  dropAreaText = "Arrastra y suelta aquí o haz clic para seleccionar una imagen",
  $customHeight,
  $customWidth,
  $customRadius,
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
    <DropZoneWrapper $customWidth={$customWidth}>
      <DropZone
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        $customRadius={$customRadius}
        $customHeight={$customHeight}
      >
        {inputImagePreview ? (
          <ImagePreview>
            <RemoveBtn onClick={handleRemoveImage}>✕</RemoveBtn>
            <ImagePreviewImg src={inputImagePreview} alt="Product Preview" />
          </ImagePreview>
        ) : (
          <CustomFileUpload>
            <FileInput type="file" onChange={handleImageChange} />
            <CameraFill size={30} />
            {dropAreaText}
          </CustomFileUpload>
        )}
      </DropZone>
      {inputImagePreview && (
        <RemoveBtn onClick={handleRemoveImage}>✕</RemoveBtn>
      )}
    </DropZoneWrapper>
  );
};

ImageUploader.propTypes = {
  inputImage: PropTypes.object,
  inputImagePreview: PropTypes.string,
  setInputImage: PropTypes.func.isRequired,
  setInputImagePreview: PropTypes.func.isRequired,
  dropAreaText: PropTypes.string,
  labelText: PropTypes.string,
};

export default ImageUploader;

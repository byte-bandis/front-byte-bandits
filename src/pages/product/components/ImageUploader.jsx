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

const origin = import.meta.env.VITE_API_BASE_URL;

const ImageUploader = ({
  inputImagePreview,
  setInputImage,
  setInputImagePreview,
  dropAreaText = "Drag and drop your image here or clic to upload from your computer",
  $customHeight,
  $customWidth,
  $customRadius,
  $customWrapperTop,
  $customWrapperLeft,
  $customWrapperPosition,
  $customDropZoneShadow,
  $customWrapperZIndex,
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
    <DropZoneWrapper
      $customWidth={$customWidth}
      $customWrapperPosition={$customWrapperPosition}
      $customWrapperLeft={$customWrapperLeft}
      $customWrapperTop={$customWrapperTop}
      $customWrapperZIndex={$customWrapperZIndex}
    >
      <DropZone
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        $customRadius={$customRadius}
        $customHeight={$customHeight}
        $customDropZoneShadow={$customDropZoneShadow}
      >
        {inputImagePreview ? (
          <ImagePreview>
            <RemoveBtn onClick={handleRemoveImage}>✕</RemoveBtn>
            <ImagePreviewImg
              src={inputImagePreview}
              alt="Product Preview"
              crossOrigin={origin}
            />
          </ImagePreview>
        ) : (
          <CustomFileUpload>
            <FileInput
              type="file"
              onChange={handleImageChange}
            />
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
  $customHeight: PropTypes.string,
  $customWidth: PropTypes.string,
  $customRadius: PropTypes.string,
  $customWrapperPosition: PropTypes.string,
  $customWrapperTop: PropTypes.string,
  $customWrapperLeft: PropTypes.string,
  $customWrapperZIndex: PropTypes.string,
  $customDropZoneShadow: PropTypes.string,
};

export default ImageUploader;

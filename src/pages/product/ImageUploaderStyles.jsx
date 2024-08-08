import styled from "styled-components";

export const DropZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  text-align: center;
  position: relative;
  background: #f9f9f9;
  overflow: hidden;
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CustomFileUpload = styled.label`
  display: block;
  padding: 138px 0px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  position: relative;
`;

export const RemoveBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(204, 204, 204, 0.75);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgba(204, 204, 204, 1);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

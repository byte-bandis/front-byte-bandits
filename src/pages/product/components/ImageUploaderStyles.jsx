import styled from "styled-components";

export const DropZoneWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${(props) => props.$customWidth || "100%"};
`;

export const DropZone = styled.div`
  border: 2px dashed #ccc;
  border-radius: ${(props) => props.$customRadius || "10px"};
  text-align: center;
  height: ${(props) => props.$customHeight || "300px"};
  background: #f9f9f9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
`;

export const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CustomFileUpload = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
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
  z-index: 100;

  &:hover {
    background-color: rgba(204, 204, 204, 1);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

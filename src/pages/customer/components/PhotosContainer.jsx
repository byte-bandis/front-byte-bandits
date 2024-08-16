import styled from "styled-components";

const PhotosContainer = styled.div`
  position: ${(props) => props.$customPosition || "relative"};
  top: ${(props) => props.$customTop || "0"};
  display: ${(props) => props.$customDisplay || "block"};
  width: ${(props) => props.$customWidth || "auto"};
  height: ${(props) => props.$customHeight || "auto"};
`;

export default PhotosContainer;

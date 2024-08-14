import styled from "styled-components";

const PhotosContainer = styled.div`
  position: relative;
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
`;

export default PhotosContainer;

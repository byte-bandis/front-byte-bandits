import styled from "styled-components";

const StyledContainer = styled.div`
  display: ${(props) => props.$customDisplay || "block"};
  position: ${(props) => props.$customPosition || "relative"};
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  gap: ${(props) => props.$customGap || "10px"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  width: ${(props) => props.$customWidth || "100%"};
`;

export default StyledContainer;

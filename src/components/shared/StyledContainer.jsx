import styled from "styled-components";
import P from "prop-types";

const StyledContainer = ({ children, ...props }) => {
  return <StyleContainer {...props}>{children}</StyleContainer>;
};

const StyleContainer = styled.div`
  display: ${(props) => props.$customDisplay || "block"};
  position: ${(props) => props.$customPosition || "relative"};
  background: ${(props) => props.$customBackground || "transparent"};
  border: ${(props) => props.$customBorder || "none"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  gap: ${(props) => props.$customGap || "10px"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  width: ${(props) => props.$customWidth || "100%"};
  margin: ${(props) => props.$customMargin || "0"};
  z-index: ${(props) => props.$customZIndex || "0"};
  font-weigth: ${(props) => props.$customFontWeight || 100};
`;

export default StyledContainer;

StyledContainer.propTypes = {
  children: P.node,
};

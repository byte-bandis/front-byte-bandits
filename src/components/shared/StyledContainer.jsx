import styled from "styled-components";
import P from "prop-types";

const StyledContainer = ({ children, isHidden, ...props }) => {
  return (
    <StyleContainer
      isHidden={isHidden}
      {...props}
    >
      {children}
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  display: ${(props) =>
    props.isHidden ? "none" : props.$customDisplay || "block"};
  position: ${(props) => props.$customPosition || "relative"};
  background: ${(props) => props.$customBackground || "transparent"};
  border: ${(props) => props.$customBorder || "none"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  gap: ${(props) => props.$customGap || "10px"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  text-align: ${(props) => props.$customTextAlign || "left"};
  width: ${(props) => props.$customWidth || "100%"};
  height: ${(props) => props.$customHeight || "auto"};
  margin: ${(props) => props.$customMargin || "0"};
  padding: ${(props) => props.$customPadding || "0"};
  z-index: ${(props) => props.$customZIndex || "0"};
  font-weight: ${(props) => props.$customFontWeight || 400};
  color: ${(props) => props.$customColor || "var(--text-1)"};
`;

export default StyledContainer;

StyledContainer.propTypes = {
  isHidden: P.bool,
  children: P.node,
  className: P.string,
};

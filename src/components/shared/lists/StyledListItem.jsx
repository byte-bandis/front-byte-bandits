import styled from "styled-components";

const StyledListItem = styled.li`
  display: ${(props) => props.$customDisplay || "block"};
  padding: ${(props) => props.$customPadding || "0"};
  border: ${(props) => props.$customBorder || "none"};
  border-radius: ${(props) => props.$customBorderRadius || "none"};
  background: ${(props) => props.$customBackground || "transparent"};
  font-size: ${(props) => props.$customFontSize || "1rem"};
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  gap: ${(props) => props.$customGap || "20px"};
  margin: ${(props) => props.$customMargin || "0"};

  h1,
  h2,
  h3,
  h4,
  h5 {
    padding: ${(props) => props.$customHeaderPadding || "0"};
    margin: ${(props) => props.$customHeaderMargin || "0"};
    font-size: ${(props) => props.$customHeaderFontSize || "1rem"};
  }
  label {
    padding: ${(props) => props.$customLabelPadding || "0"};
    margin: ${(props) => props.$customLabelMargin || "0"};
    font-size: ${(props) => props.$customLabelFontSize || "1rem"};
    font-weight: ${(props) => props.$customLabelFontWeight || "regular"};
  }
  input {
    border: ${(props) =>
      props.$customInputBorder || "1px dotted var(--primary-100)"};
    border-radius: ${(props) => props.$customInputBorderRadius || "5px"};
    padding: ${(props) => props.$customInputPadding || "0"};
  }
`;

export default StyledListItem;

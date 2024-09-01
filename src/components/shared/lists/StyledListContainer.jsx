import styled from "styled-components";
import StyledContainer from "../StyledContainer";

const StyledListContainer = styled(StyledContainer)`
  display: ${(props) => props.$customDisplay || "flex"};
  position: ${(props) => props.$customPosition || "relative"};
  flex-direction: ${(props) => props.$customFlexDirection || "row"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
  padding: ${(props) => props.$customPadding || "1rem"};
  border: ${(props) => props.$customBorder || "1px dotted var(--primary-100)"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  background: ${(props) => props.$customBackground || "var(--bg-100)"};
  font-size: ${(props) => props.$customFontSize || "1rem"};
  width: ${(props) => props.$customWidth || "auto"};

  ul {
    list-style: ${(props) => props.$customListStyle || "none"};
    padding: ${(props) => props.$customListPadding || "0"};
    margin: ${(props) => props.$customListMargin || "0"};
    width: ${(props) => props.$customListWidth || "100%"};
  }
`;

export default StyledListContainer;

import styled from "styled-components";
import StyledContainer from "../StyledContainer";

const StyledListContainer = styled(StyledContainer)`
  padding: ${(props) => props.$customPadding || "1rem"};
  border: ${(props) => props.$customBorder || "1px dotted var(--primary-100)"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  background: ${(props) => props.$customBackground || "var(--bg-100)"};
  font-size: ${(props) => props.$customFontSize || "1rem"};

  ul {
    list-style: ${(props) => props.$customListStyle || "none"};
    padding: ${(props) => props.$customListPadding || "0"};
    margin: ${(props) => props.$customListMargin || "0"};
  }
`;

export default StyledListContainer;

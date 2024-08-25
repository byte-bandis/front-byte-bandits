import styled from "styled-components";

const StyledListItem = styled.li`
  padding: ${(props) => props.$customPadding || "none"};
  border: ${(props) => props.$customBorder || "none"};
  border-radius: ${(props) => props.$customBorderRadius || "none"};
  background: ${(props) => props.$customBackground || "none"};
  font-size: ${(props) => props.$customFontSize || "1rem"};
`;

export default StyledListItem;

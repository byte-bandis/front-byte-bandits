import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: ${(props) => props.$customMargin || "25px"};
  display: ${(props) => props.$customDisplay || "flex"};
  gap: ${(props) => props.$customGap || "15px"};
  justify-content: ${(props) => props.$customJustifyContent || "flex-start"};
`;

export default ButtonContainer;

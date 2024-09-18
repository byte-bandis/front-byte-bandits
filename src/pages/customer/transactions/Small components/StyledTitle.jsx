import styled from "styled-components";

const StyledTitle = styled.p`
  color: ${(props) => props.$color || "var(--primary-300)"};
  font-size: ${(props) => props.$fontSize || "32px"};
  font-weight: ${(props) => props.$fontWeight || "500"};
  text-align: ${(props) => props.$textAlign || "center"};
  cursor: ${(props) => props.$customCursor || "pointer"};
  margin: ${(props) => props.$margin || "0"};
  padding: ${(props) => props.$padding || "0"};
`;

export default StyledTitle;

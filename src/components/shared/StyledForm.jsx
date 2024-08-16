import styled from "styled-components";

const StyledForm = styled.form`
  position: ${(props) => props.$customPosition || "relative"};
  display: ${(props) => props.$customDisplay || "flex"};
  flex-direction: column;
  align-items: ${(props) => props.$customAlignItems || "center"};
  gap: 1rem;
  padding: 2rem;
  width: ${(props) => props.$customWidth || "100%"};
  max-width: ${(props) => props.$customMaxWidth || "600px"};
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default StyledForm;

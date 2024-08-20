import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #f9f9f9;

  &::placeholder {
    font-style: italic;
    color: gray;
  }
`;
export default StyledTextarea;

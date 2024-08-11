import styled from "styled-components";
import "../../App.css";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const StyledForm = styled.form`
  width: 40rem;
  max-width: 90%;
  z-index: 1;
  animation: showSignInForm 1s;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem var(--shadow-1);
  border-radius: 0.375rem;
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 0.5rem;
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  &:focus {
    outline: none;
    border-color: rgba(128, 189, 255, 1);
    box-shadow: 0 0 0 0.2rem rgba(128, 189, 255, 0.5);
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

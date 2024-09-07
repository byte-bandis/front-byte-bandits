import styled from "styled-components";
import "../../App.css";

export const StyledForm = styled.form`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
  animation: showSignInForm 1s;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem var(--shadow-1);
  border-radius: 0.375rem;
  background-color: var(--bg-100);
  color: var(--text-200);
  opacity: 1;
  color: var(--primary-300);
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 0.5rem;
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
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

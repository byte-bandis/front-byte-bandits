import styled from "styled-components";
import P from "prop-types";
import CustomButton from "./CustomButton";

const CustomForm = ({
  children,
  className = "",
  onSubmit,
  submitButtonText = "Submit",
  isLoading = false,
  disableSubmit = false,
  ...rest
}) => {
  return (
    <StyledForm className={className} {...rest}>
      <form onSubmit={onSubmit}>
        <StyledLegend>{children}</StyledLegend>

        <ButtonContainer>
          <CustomButton type="submit" disabled={disableSubmit || isLoading}>
            {isLoading ? "Submitting..." : submitButtonText}
          </CustomButton>
        </ButtonContainer>
      </form>
    </StyledForm>
  );
};

export default CustomForm;

CustomForm.propTypes = {
  children: P.node.isRequired,
  className: P.string,
  onSubmit: P.func.isRequired,
  submitButtonText: P.string,
  isLoading: P.bool,
  disableSubmit: P.bool,
  alertMessage: P.string,
  alertVariant: P.oneOf(["success", "error", "other"]),
  onAlertClose: P.func,
};

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLegend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;
// const StyledFields = styled.div`
//   list-style: none
//   margin-bottom: 10px;
// `;

// const StyledLabel = styled.label`
//   margin-right: ${({ marginRight }) => marginRight || "10px"};
// `;

// const StyledInput = styled.input`
//   padding: ${({ padding }) => padding || "10px"};
//   margin-bottom: ${({ marginBottom }) => marginBottom || "10px"};
//   border-radius: ${({ borderRadius }) => borderRadius || "5px"};
//   border: ${({ border }) => border || "1px solid"};
// `;

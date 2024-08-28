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
          <CustomButton $type="submit" $disabled={disableSubmit || isLoading}>
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

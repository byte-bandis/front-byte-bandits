import styled from "styled-components";
import P from "prop-types";
import RegularButton from "./buttons/RegularButton";

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
          <RegularButton $type="submit" $disabled={disableSubmit || isLoading}>
            {isLoading ? "Submitting..." : submitButtonText}
          </RegularButton>
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
  display: ${(props) => props.$CustomDisplay || "flex"};
  flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
  justify-content: ${(props) => props.$CustomJustifyContent || "center"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
`;

const StyledLegend = styled.div`
  display: ${(props) => props.$CustomDisplay || "flex"};
  flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
  justify-content: ${(props) => props.$CustomJustifyContent || "center"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
`;

const ButtonContainer = styled.div`
  display: ${(props) => props.$CustomDisplay || "flex"};
  justify-content: ${(props) => props.$CustomJustifyContent || "center"};
  width: ${(props) => props.$CustomWidth || "100%"};
  margin-top: ${(props) => props.$CustomMarginTop || "20px"};
`;

import styled from "styled-components";
import P from "prop-types";
import CustomButton from "./CustomButton";
import CustomAlert from "./Alert";

const CustomForm = ({
  children,
  className,
  onSubmit,
  submitButtonText,
  isLoading,
  disableSubmit,
  alertMessage,
  alertVariant,
  onAlertClose,
  ...rest
}) => {
  return (
    <StyledForm className={className} {...rest}>
      <form onSubmit={onSubmit}>
        <StyledLegend>{children}</StyledLegend>

        {alertMessage && (
          <CustomAlert variant={alertVariant} onClose={onAlertClose}>
            {alertMessage}
          </CustomAlert>
        )}

        <CustomButton type="submit" disabled={disableSubmit || isLoading}>
          {isLoading ? "Submitting..." : submitButtonText}
        </CustomButton>
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

CustomForm.defaultProps = {
  className: "",
  submitButtonText: "Submit",
  isLoading: "false",
  disableSubmit: false,
  alertMessage: null,
  alertVariant: "other",
  onAlertClose: () => {},
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

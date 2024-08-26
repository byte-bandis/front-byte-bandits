import P from "prop-types";
import styled from "styled-components";

const CustomAlert = ({ variant, children, onClose }) => {
  return (
    <AlertMessage variant={variant}>
      <span>{children}</span>
      {onClose && <CloseButton onClick={onClose}>X</CloseButton>}
    </AlertMessage>
  );
};

export default CustomAlert;

CustomAlert.propTypes = {
  variant: P.oneOf(["success", "error", "other"]).isRequired,
  children: P.node.isRequired,
  onClose: P.func,
};

const AlertMessage = styled.div`
    padding: ${({ padding }) => padding || "15px"}
    margin-bottom: ${({ marginBottom }) => marginBottom || "20px"}
    border: ${({ border }) => border || "1px solid transparent"}
    border-radius: ${({ borderRadius }) => borderRadius || "4px"}
    background-color ${({ variant }) =>
      variant === "success"
        ? "var(--success-2)"
        : variant === "error"
          ? "var(--error-2)"
          : "var(--bg-100)"}
`;

const CloseButton = styled.button`
 
    background: ${({ background }) => background || "none"};
    border: ${({ border }) => border || "none"}
    font-size: ${({ fontSize }) => fontSize || "16px"}
    float: right;
    cursor: pointer;

`;

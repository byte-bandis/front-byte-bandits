import P from "prop-types";
import styled from "styled-components";

const CustomAlert = ({ variant, children, onClose }) => {
  return (
    <AlertMessage variant={variant}>
      {onClose && <CloseButton onClick={onClose}>X</CloseButton>}
      <div>
        {children.map((message, index) => (
          <span key={index}>
            {message}
            <br />
          </span>
        ))}
      </div>
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
  padding: ${(props) => props.$padding || "15px"};
  margin-bottom: ${(props) => props.$marginBottom || "20px"};
  border: ${(props) => props.$border || "1px solid transparent"};
  border-radius: ${(props) => props.$borderRadius || "4px"};
  background-color: ${(props) =>
    props.$variant === "success"
      ? "var(--success-2)"
      : props.$variant === "error"
        ? "var(--error-2)"
        : "var(--bg-100)"};
`;

const CloseButton = styled.button`
  background: ${(props) => props.$background || "none"};
  border: ${(props) => props.$border || "none"};
  font-size: ${(props) => props.$fontSize || "16px"};
  float: right;
  cursor: pointer;
`;

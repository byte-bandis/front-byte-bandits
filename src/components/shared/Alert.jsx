import P from "prop-types";
import styled from "styled-components";

const CustomAlert = ({ variant, children, onClose, ...props }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <AlertMessage variant={variant} {...props}>
      {onClose && <CloseButton onClick={onClose}>X</CloseButton>}
      <div>
        {childrenArray.map((message, index) => (
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
  padding: ${(props) => props.$CustomPadding || "15px"};
  margin-bottom: ${(props) => props.$CustomMarginBottom || "0px"};
  border: ${(props) => props.$CustomBorder || "1px solid transparent"};
  border-radius: ${(props) => props.$CustomBorderRadius || "4px"};
  background-color: ${(props) =>
    props.variant === "success"
      ? "var(--primary-100)"
      : props.variant === "error"
        ? "var(--error-2)"
        : "var(--bg-100)"};
  width: ${(props) => props.$customWidth || "70%"};
  color: ${(props) => props.$customColor || "var(--text-100)"};
`;

const CloseButton = styled.button`
  background: ${(props) => props.$CustomBackground || "none"};
  border: ${(props) => props.$CustomBorder || "none"};
  font-size: ${(props) => props.$CustomFontSize || "16px"};
  float: right;
  cursor: pointer;
`;

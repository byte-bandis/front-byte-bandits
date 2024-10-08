import P from "prop-types";
import styled from "styled-components";

const CustomAlert = ({
  variant,
  children,
  onClose,
  customStyles,
  ...props
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <AlertMessage variant={variant} {...customStyles} {...props}>
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
  customStyles: P.objectOf(P.string),
};

const AlertMessage = styled.div`
  padding: ${(props) => props.$CustomPadding || "15px"};
  margin-bottom: ${(props) => props.$CustomMarginBottom || "0px"};
  border: ${(props) => props.$CustomBorder || "1px solid transparent"};
  border-radius: ${(props) => props.$CustomBorderRadius || "4px"};
  background-color: ${(props) =>
    props.variant === "success"
      ? "var(--success-1)"
      : props.variant === "error"
        ? "var(--error-2)"
        : "var(--bg-100)"};
  width: ${(props) => props.$customWidth || "70%"};
  color: ${(props) => props.$customColor || "var(--text-100)"};
  position: ${(props) => props.$customPosition || "static"};
  top: ${(props) => props.$customTop || "0px"};
  right: ${(props) => props.$customRight || "0px"};
  z-index: ${(props) => props.$customZIndex || "auto"};
`;

const CloseButton = styled.button`
  background: ${(props) => props.$CustomBackground || "none"};
  border: ${(props) => props.$CustomBorder || "none"};
  font-size: ${(props) => props.$CustomFontSize || "16px"};
  float: right;
  cursor: pointer;
`;

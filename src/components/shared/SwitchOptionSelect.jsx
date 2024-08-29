import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import styled from "styled-components";

const SwitchOptionSelect = ({
  children,
  className,
  sell,
  handleSwitchChange,
  ...rest
}) => {
  return (
    <>
      <StyledLabel>{children}</StyledLabel>
      <StyledSwitch
        type="switch"
        className={className}
        label={sell ? "Buy" : "Sell"}
        checked={sell}
        onChange={handleSwitchChange}
        {...rest}
      />
    </>
  );
};

SwitchOptionSelect.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sell: PropTypes.bool,
  handleSwitchChange: PropTypes.func.isRequired,
};

export default SwitchOptionSelect;

const StyledLabel = styled(Form.Label)`
  display: ${(props) => props.$CustomDisplay || "block"};
  margin-bottom: ${(props) => props.$CustomMarginBottom || "5px"};
  color: ${(props) => props.$CustomColor || "var(--text-1)"};
`;

const StyledSwitch = styled(Form.Check)`
  .form-check-input {
    width: ${(props) => props.$CustomWidth || "50px"};
    height: ${(props) => props.$CustomHeight || "25px"};
    background-color: ${(props) =>
      props.$CustomBackgroundColor || "var(--bg-3)"};
    border-radius: ${(props) => props.$CustomBorderRadius || "50px"};
    position: ${(props) => props.$CustomPosition || "relative"};
    cursor: ${(props) => props.$CustomCursor || "pointer"};
    border: ${(props) => props.$CustomBorder || "none"};
    appearance: none;
    -webkit-appearance: none;
    transition: ${(props) =>
      props.$CustomTransition || "background-color 0.3s"};
  }

  .form-check-input:checked {
    background-color: ${(props) =>
      props.$CustomCheckedBackgroundColor || "var(--botton-1)"};
  }

  .form-check-input::before {
    content: "";
    position: ${(props) => props.$CustomPosition || "absolute"};
    top: ${(props) => props.$CustomTop || "2px"};
    left: ${(props) => props.$CustomLeft || "2px"};
    width: ${(props) => props.$CustomWidth || "21px"};
    height: ${(props) => props.$CustomHeight || "21px"};
    background-color: ${(props) =>
      props.$CustomBackgroundColor || "var(--botton-2)"};
    border-radius: ${(props) => props.$CustomBorderRadius || "50%"};
    transition: ${(props) => props.$CustomTransition || "transform 0.3s"};
  }

  .form-check-input:checked::before {
    transform: ${(props) => props.$CustomTransform || "translateX(25px)"};
  }

  .form-check-label {
    margin-left: ${(props) => props.$CustomMarginLeft || "10px"};
    color: ${(props) => props.$CustomColor || "var(--text-1)"};
  }
`;

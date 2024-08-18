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
  display: block;
  margin-bottom: 5px;
  color: var(--text-1);
`;

const StyledSwitch = styled(Form.Check)`
  .form-check-input {
    width: 50px;
    height: 25px;
    background-color: var(--bg-3);
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    transition: background-color 0.3s;
  }

  .form-check-input:checked {
    background-color: var(--botton-1);
  }

  .form-check-input::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    background-color: var(--botton-2);
    border-radius: 50%;
    transition: transform 0.3s;
  }

  .form-check-input:checked::before {
    transform: translateX(25px);
  }

  .form-check-label {
    margin-left: 10px;
    color: var(--text-1);
  }
`;

import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const SwitchOptionSelect = ({
  children,
  className,
  isBuy,
  handleSwitchChange,
  ...rest
}) => {
  return (
    <>
      <Form.Label>{children}</Form.Label>
      <Form.Check
        type="switch"
        className={className}
        label={isBuy ? "Buy" : "Sell"}
        checked={isBuy}
        onChange={handleSwitchChange}
        {...rest}
      ></Form.Check>
    </>
  );
};

export default SwitchOptionSelect;

SwitchOptionSelect.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isBuy: PropTypes.bool.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
};

import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const SwitchOptionSelect = ({
  children,
  className,
  sell,
  handleSwitchChange,
  ...rest
}) => {
  return (
    <>
      <Form.Label>{children}</Form.Label>
      <Form.Check
        type="switch"
        className={className}
        label={sell ? "Buy" : "Sell"}
        checked={sell}
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
  sell: PropTypes.bool,
  handleSwitchChange: PropTypes.func.isRequired,
};

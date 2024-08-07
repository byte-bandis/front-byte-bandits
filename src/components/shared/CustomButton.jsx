import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CustomButton = ({ children, to, variant, size, className, ...rest }) => {
  return (
    <Button
      as={to ? Link : "button"}
      to={to}
      variant={variant}
      size={size}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;

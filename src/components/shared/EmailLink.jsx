import { Envelope } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EmailLink = ({ to, variant, size, className, ...rest }) => {
  return (
    <Link
      to={to}
      className={`envelope-link} ${className}`}
      {...rest}
      as={to ? Link : "button"}
    >
      <Envelope size={size} variant={variant} className="envelope-icon" />
    </Link>
  );
};

EmailLink.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default EmailLink;

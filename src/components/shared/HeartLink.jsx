import { Heart } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeartLink = ({ to, variant, size, className, ...rest }) => {
  return (
    <Link
      to={to}
      className={`heart-link} ${className}`}
      {...rest}
      as={to ? Link : "button"}
    >
      <Heart size={size} variant={variant} className="heart-icon" />
    </Link>
  );
};

HeartLink.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default HeartLink;

// IconWrapper.js
import PropTypes from "prop-types";

const IconWrapper = ({
  IconComponent,
  size = "75px",
  color = "var(--primary-200)",
  top = "10%",
  right = "5%",
  style = {},
  ...props
}) => {
  return (
    <IconComponent
      width={size}
      height={size}
      color={color}
      style={{
        position: "absolute",
        top,
        right,
        ...style,
      }}
      {...props}
    />
  );
};

IconWrapper.propTypes = {
  IconComponent: PropTypes.elementType.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  style: PropTypes.object,
};

export default IconWrapper;

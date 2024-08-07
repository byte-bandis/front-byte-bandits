import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const DropdownLink = ({
  children,
  optionText1,
  optionText2,
  userZoneTo,
  logout,
  className,
  ...rest
}) => {
  return (
    <NavDropdown title={children} className={className} id="basic-nav-dropdown">
      <NavDropdown.Item
        as={Link}
        to={userZoneTo}
        className={className}
        {...rest}
      >
        {optionText1}
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as="Button" onClick={logout} {...rest}>
        {optionText2}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

DropdownLink.propTypes = {
  children: PropTypes.node.isRequired,
  userZoneTo: PropTypes.string.isRequired,
  optionText1: PropTypes.string.isRequired,
  optionText2: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DropdownLink;

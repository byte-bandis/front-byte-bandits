import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";

const TagsNav = ({ className, options, ...rest }) => {
  return (
    <Nav className={className} {...rest}>
      {options.map((option, index) => (
        <Nav.Item as="li" key={index}>
          <Nav.Link href={option.to} className={option.className}>
            {option.text}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

TagsNav.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string.isRequired,
      className: PropTypes.string,
    }),
  ).isRequired,
};
export default TagsNav;

import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TagsNav = ({ className, options, ...rest }) => {
  const handleItemClick = (option) => {
    option.onClick();
  };
  return (
    <StyledNav className={className} {...rest}>
      {options.map((option, index) => (
        <StyledNavItem as="li" key={index}>
          <StyledNavLink
            as={Link}
            to={option.to}
            className={option.className}
            onClick={() => handleItemClick(option)}
          >
            {option.text}
          </StyledNavLink>
        </StyledNavItem>
      ))}
    </StyledNav>
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

const StyledNav = styled(Nav)`
  display: flex;
  width: ${(props) => props.$CustomWidth || "80%"};
  flex-wrap: ${(props) => props.$CustomFlexWrap || "nowrap"};
  gap: ${(props) => props.$CustomGap || "10px"};
  padding: ${(props) => props.$CustomPadding || "15px"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  list-style: none;
`;

const StyledNavItem = styled(Nav.Item)`
  flex: ${(props) => props.$CustomFlex || "1 1 calc(50% - 10px)"};
`;

const StyledNavLink = styled(Nav.Link)`
  display: block;
  padding: ${(props) => props.$CustomPadding || "5px"};
  color: ${(props) => props.$CustomColor || "var(--text-100)"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--bg-300)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  text-align: center;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.$CustomHoverColor || "var(--bg-100)"};
  }
`;

import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const TagsNav = ({ className, options, ...rest }) => {
  return (
    <StyledNav className={className} {...rest}>
      {options.map((option, index) => (
        <NavItem as="li" key={index}>
          <NavLink href={option.to} className={option.className}>
            {option.text}
          </NavLink>
        </NavItem>
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
  width: ${({ width }) => width || "80%"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  gap: ${({ gap }) => gap || "10px"};
  padding: ${({ padding }) => padding || "15px"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--advert-1)"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  list-style: none;
`;

const NavItem = styled(Nav.Item)`
  flex: ${({ flex }) => flex || "1 1 calc(50% - 10px)"};
`;

const NavLink = styled(Nav.Link)`
  display: block;
  padding: ${({ padding }) => padding || "10px 15px"};
  color: ${({ color }) => color || "var(--text-100)"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--bg-300)"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  text-align: center;
  text-decoration: none;

  &:hover {
    color: ${({ hoverColor }) => hoverColor || "var(--bg-100)"};
  }
`;

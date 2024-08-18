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
  width: 80%;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 15px;
  background-color: var(--advert-1);
  border-radius: 5px;
  list-style: none;
`;

const NavItem = styled(Nav.Item)`
  flex: 1 1 calc(50% - 10px);
`;

const NavLink = styled(Nav.Link)`
  display: block;
  padding: 10px 15px;
  color: var(--tag-2);
  background-color: var(--bg-3);
  border-radius: 5px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: var(--tag-2);
    color: var(--tag-1);
  }
`;

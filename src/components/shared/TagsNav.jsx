import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TagsNav = ({ options, ...rest }) => {
  return (
    <StyledNav {...rest}>
      {options.map((option, index) => (
        <StyledNavItem
          as="li"
          key={index}
        >
          <StyledNavLink
            as={Link}
            to={option.to}
            $CustomBackgroundColor="transparent"
            $CustomColor="var(--primary-300)"
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
    })
  ).isRequired,
};

export default TagsNav;

const StyledNav = styled(Nav).attrs((props) => ({
  className: props.className || "StyledNav-TagsNav",
}))`
  display: flex;
  flex-direction: ${(props) => props.$FlexDirection || "row"};
  width: ${(props) => props.$CustomWidth || "80%"};
  flex-wrap: ${(props) => props.$CustomFlexWrap || "nowrap"};
  gap: ${(props) => props.$CustomGap || "10px"};
  padding: ${(props) => props.$CustomPadding || "15px"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  list-style: none;
`;

const StyledNavItem = styled(Nav.Item).attrs((props) => ({
  className: props.className || "StyledNavItem-TagsNav",
}))`
  flex: ${(props) => props.$CustomFlex || "1 1 calc(50% - 10px)"};
`;

StyledNavItem.displayName = "StyledNavItem-TagsNav";

const StyledNavLink = styled(Nav.Link).attrs((props) => ({
  className: props.className || "StyledNavLink-TagsNav",
}))`
  display: block;
  padding: ${(props) => props.$CustomPadding || "5px"};
  color: ${(props) => props.$CustomColor || "var(--text-100)"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--bg-300)"};
  border: ${(props) => props.$CustomBorder || "1px solid var(--primary-200)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.$CustomHoverBackgroundColor || "var(--primary-200)"};
    color: ${(props) => props.$CustomHoverColor || "var(--bg-100)"};
  }
`;
StyledNavLink.displayName = "StyledNavLink-TagsNav";

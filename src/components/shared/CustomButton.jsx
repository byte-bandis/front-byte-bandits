import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CustomButton = ({ children, to, className, ...rest }) => {
  return to ? (
    <StyledLinkButton to={to} className={className} {...rest}>
      {children}
    </StyledLinkButton>
  ) : (
    <StyleButton className={className} {...rest}>
      {children}
    </StyleButton>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;

const StyledLinkButton = styled(Link)`
  padding: ${(props) => props.$padding || "10px 20px"};
  border-radius: ${(props) => props.$borderRadius || "5px"};
  text-decoration: ${(props) => props.$textDecoration || "none"};
  color: ${(props) => props.$color || "white"};
  background-color: ${(props) =>
    props.$disabled ? "lightblue" : props.$backgroundColor || "blue"};
  margin-left: ${(props) => props.$marginLeft || "0px"};
`;

const StyleButton = styled.button`
  padding: ${(props) => props.$padding || "10px 20px"};
  border-radius: ${(props) => props.$borderRadius || "5px"};
  text-decoration: ${(props) => props.$textDecoration || "none"};
  color: ${(props) => props.$color || "white"};
  background-color: ${(props) =>
    props.$disabled
      ? "lightblue"
      : props.$backgroundColor || "var(--primary-200)"};
  margin-left: ${(props) => props.$marginLeft || "0px"};
`;

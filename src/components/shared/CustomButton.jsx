import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CustomButton = ({ children, to, className, ...rest }) => {
  return to ? (
    <StyledLinkButton to={to} className={className} {...rest}>
      {children}
    </StyledLinkButton>
  ) : (
    <StyleButton className={className} {...rest}></StyleButton>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;

const StyledLinkButton = styled(Link)`
  padding: ${({ padding }) => padding || "10px 20px"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  color: ${({ color }) => color || "white"};
  background-color: ${({ backgroundColor }) => backgroundColor || "blue"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};
`;

const StyleButton = styled.button`
  padding: ${({ padding }) => padding || "10px 20px"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  color: ${({ color }) => color || "white"};
  background-color: ${({ backgroundColor }) => backgroundColor || "blue"};
  margin-left: ${({ marginLeft }) => marginLeft || "0px"};
`;

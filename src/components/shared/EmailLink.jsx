import { Envelope } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EmailLink = ({ to, size, className, ...rest }) => {
  return (
    <StyledEmailLink
      to={to}
      className={`envelope-link} ${className}`}
      {...rest}
      as={to ? Link : "button"}
    >
      <Envelope className="envelope-icon" size={size} />
    </StyledEmailLink>
  );
};

EmailLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default EmailLink;

const StyledEmailLink = styled(Link)`
  margin-right: ${({ marginRight }) => marginRight || "30px"};
  color: ${({ color }) => color || "blue"};
  transition: ${({ transition }) => transition || "color 0.3s ease"};

}
  &:hover {
    color: ${({ hoverColor }) => hoverColor || "red"};
  }
`;

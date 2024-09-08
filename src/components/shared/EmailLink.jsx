import { Envelope, EnvelopeFill } from "react-bootstrap-icons";
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
  margin-right: ${(props) => props.$CustomMarginRight || "0px"};
  color: ${(props) => props.$CustomColor || "var(--primary-200)"};
  transition: ${(props) => props.$CustomTransition || "color 0.3s ease"};

  .envelope-icon:hover {
    color: ${(props) => props.$CustomHoverColor || "red"};
  }
`;

import { Heart } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeartLink = ({ to, size, className, ...rest }) => {
  return (
    <StyledHeartLink
      to={to}
      className={`heart-link} ${className}`}
      {...rest}
      as={to ? Link : "button"}
    >
      <Heart size={size} className="heart-icon" />
    </StyledHeartLink>
  );
};

HeartLink.propTypes = {
  to: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default HeartLink;

const StyledHeartLink = styled(Link)`
  margin-right: ${({ marginRight }) => marginRight || "30px"};
  color: ${({ color }) => color || "blue"};
  transition: ${({ transition }) => transition || "color 0.3s ease"};

}
  &:hover {
    color: ${({ hoverColor }) => hoverColor || "red"};
  }
`;

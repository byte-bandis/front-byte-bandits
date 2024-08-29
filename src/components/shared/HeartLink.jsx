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
  margin-right: ${(props) => props.$CustomMarginRight || "30px"};
  color: ${(props) => props.$CustomColor || "blue"};
  transition: ${(props) => props.$CustomTransition || "color 0.3s ease"};

  .heart-icon:hover {
    color: ${(props) => props.$CustomHoverColor || "red"};
  }
`;

import { Heart, HeartFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectWishlist } from "../../store/selectors";
import { useSelector } from "react-redux";

const HeartLink = ({ to, size, className, ...rest }) => {
  const userWishlist = useSelector(selectWishlist);

  return (
    <StyledHeartLink
      to={to}
      className={`heart-link} ${className}`}
      {...rest}
      as={to ? Link : "button"}
    >
      {userWishlist.length > 0 ? (
        <HeartFill size={size} className="heart-icon" />
      ) : (
        <Heart size={size} className="heart-icon" />
      )}
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
  margin: ${(props) => props.$CustomMargin || "0px"};
  color: ${(props) => props.$CustomColor || "var(--primary-200)"};
  transition: ${(props) => props.$CustomTransition || "color 0.3s ease"};

  .heart-icon:hover {
    color: ${(props) => props.$CustomHoverColor || "red"};
  }
`;

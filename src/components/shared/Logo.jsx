import { Link } from "react-router-dom";
import logoLight from "../../assets/images/IcraftYouLogoLight.png";
import logoDark from "../../assets/images/IcraftYouLogoDark.png";
import PropTypes from "prop-types";

import styled from "styled-components";

const Logo = ({
  $dark,
  $CustomWidth,
  $customImageWidth,
  $customImageHeight,
}) => {
  return (
    <>
      <StyledLogo
        $CustomWidth={$CustomWidth}
        $customImageWidth={$customImageWidth}
        $customImageHeight={$customImageHeight}
      >
        <Link to="/">
          <img
            src={$dark ? logoDark : logoLight}
            className="logo"
            alt="Byte Bandits logo"
          />
        </Link>
      </StyledLogo>
    </>
  );
};

Logo.propTypes = {
  $dark: PropTypes.bool,
  $CustomWidth: PropTypes.string,
  $customImageWidth: PropTypes.string,
  $customImageHeight: PropTypes.string,
};

export default Logo;

const StyledLogo = styled.div`
  width: ${(props) => props.$CustomWidth || "70px"};
  height: ${(props) => props.$CustomHeight || "auto"};
  text-align: ${(props) => props.$CustomTextAlign || "center"};

  img.logo {
    width: ${(props) => props.$customImageWidth || "100%"};
    height: ${(props) => props.$customImageHeight || "100%"};
    object-fit: contain;
  }
`;

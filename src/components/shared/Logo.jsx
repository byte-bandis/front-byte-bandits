import { Link } from "react-router-dom";
import logo from "../../assets/images/ICraftYou.png";

import styled from "styled-components";

const Logo = () => {
  return (
    <>
      <StyledLogo>
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
      </StyledLogo>
    </>
  );
};

export default Logo;

const StyledLogo = styled.div`
  width: ${(props) => props.$CustomWidth || "70px"};
  height: ${(props) => props.$CustomHeight || "auto"};

  img.logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

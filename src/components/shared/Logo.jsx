import { Link } from "react-router-dom";
import logo from "../../../public/ICraftYou.png";

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
  width: ${({ width }) => width || "70px"};
  height: ${({ height }) => height || "auto"};

  img.logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

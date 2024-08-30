import styled from "styled-components";
import Search from "../../pages/search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo";
import RegularButton from "./buttons/RegularButton";
import EmailLink from "./EmailLink";
import HeartLink from "./HeartLink";
import { logout } from "../../pages/auth/service";
import DropdownLink from "./DropdownLink";
import { resetLoggedUserInfo } from "../../store/authSlice";
import { resetSinglePublicProfile } from "../../store/singlePublicProfileSlice";
import TagsNav from "./TagsNav";
import { getLoggedUserName } from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";
import Confirmator from "./Confirmator";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authState.authState);
  const [showConfirmator, setShowConfirmator] = useState(false);

  const loggedUser = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(resetLoggedUserInfo());
    dispatch(resetSinglePublicProfile());
    dispatch(resetUI());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSellButton = () => {
    if (isAuthenticated) {
      navigate(`${loggedUser}/new`);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const dropdownOptions = [
    { text: "User Zone", to: `${loggedUser}/myaccount`, className: "UserZone" },
    {
      text: "Log out",
      onClick: () => {
        console.log("Setting showConfirmator to true");
        setShowConfirmator(true);
        console.log("Setting now to true?");
      },
      className: "Logout",
    },
  ];

  const TAG_OPTIONS = [
    {
      onClick: () => navigate("/"),
      className: "all",
      text: "All categories",
    },
    {
      text: "lifestyle",
      onClick: () => navigate(`/product/?tags=lifestyle&sell=true`),
      className: "lifestyle",
    },
    {
      text: "mobile",
      onClick: () => navigate("/product/?tags=mobile&sell=true"),
      className: "mobile",
    },
    {
      text: "motor",
      onClick: () => navigate("/product/?tags=motor&sell=true"),
      className: "motor",
    },
    {
      text: "work",
      onClick: () => navigate("/product/?tags=work&sell=true"),
      className: "work",
    },
    {
      text: "others",
      onClick: () => navigate("/product/?tags=others&sell=true"),
      className: "others",
    },
  ];

  const filteredTagOptions = TAG_OPTIONS.filter(
    (tag) => tag.text !== "All categories",
  );

  return (
    <>
      {showConfirmator && (
        <Confirmator
          textValue="cerrar su sesión de usuario?"
          onConfirm={handleLogout}
          sethiden={() => setShowConfirmator(false)}
          hidden={showConfirmator}
        />
      )}
      <StyledContainer>
        <StyledNav className="d-flex align-items-center w-100">
          <Logo />
          <SearchContainer>
            <Search />
          </SearchContainer>
          {isAuthenticated ? (
            <>
              <HeartLink to={"/myaccount"} size={30} className="heartHead" />
              <EmailLink to={"/myaccount"} size={35} className="emailHead" />
              <DropdownLink
                options={dropdownOptions}
                className="myAccount"
                $CustomWidth="130px"
                dividerWith="128%"
              >
                My account
              </DropdownLink>
              <RegularButton
                onClick={handleSellButton}
                className="sellButton"
                $customMargin="0px 25px"
                $customBackGroundColor="var(--accent-100)"
                $CustomPadding="5px"
                $customBorder="none"
              >
                Sell - Buy
              </RegularButton>
            </>
          ) : (
            <>
              <RegularButton
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
                state={{ from: location }}
                className="login"
                $backgroundColor="var(--primary-200)"
              >
                Login or register
              </RegularButton>
              <RegularButton
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
                className="sellButton"
                $customMargin="0px 25px"
                $customBackGroundColor="var(--accent-100)"
                $CustomPadding="5px"
                $customBorder="none"
              >
                Sell - Buy
              </RegularButton>
            </>
          )}
        </StyledNav>
      </StyledContainer>
      <StyledTagsNavContainer>
        <DropdownLink options={TAG_OPTIONS} className="allCategories">
          All categories
        </DropdownLink>
        <TagsNav
          className="tagsNavegation"
          options={filteredTagOptions}
        ></TagsNav>
      </StyledTagsNavContainer>
    </>
  );
};

export default Header;

const StyledContainer = styled.div`
  position: ${(props) => props.$CustomPosition || "fixed"};
  top: ${(props) => props.$CustomTop || 0};
  left: ${(props) => props.$CustomLeft || 0};
  right: ${(props) => props.$CustomRight || 0};
  padding: ${(props) => props.$CustomPadding || "0 15px"};
  display: ${(props) => props.$CustomDisplay || "flex"};
  justify-content: ${(props) => props.$CustomJustifyContent || "space-between"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  width: ${(props) => props.$CustomWidth || "100%"};
  z-index: ${(props) => props.$CustomZIndex || 2000};
  background-color: ${(props) =>
    props.$customBackGroundColor || "var(--bg-100)"};
`;

const StyledNav = styled.nav`
  display: ${(props) => props.$CustomDisplay || "flex"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  width: ${(props) => props.$CustomWidth || "100%"};
`;

const SearchContainer = styled.div`
  flex-grow: ${(props) => props.$CustomFlexGrow || 1};
  margin: ${(props) => props.$CustomMargin || "0 15px"};
`;

const StyledTagsNavContainer = styled.div`
  position: ${(props) => props.$CustomPosition || "fixed"};
  top: ${(props) => props.$CustomTop || "60px"};
  left: ${(props) => props.$CustomLeft || 0};
  right: ${(props) => props.$CustomRight || 0};
  display: ${(props) => props.$CustomDisplay || "flex"};
  justify-content: ${(props) => props.$CustomJustifyContent || "flex-start"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  width: ${(props) => props.$CustomWidth || "100%"};
  background-color: ${(props) =>
    props.$customBackGroundColor || "var(--bg-100)"};
  .allCategories {
    margin-right: ${(props) => props.$CustomMarginRight || "20px"};
  }

  .TagsNavegation {
    display: ${(props) => props.$CustomDisplay || "flex"};
    flex-wrap: ${(props) => props.$CustomFlexWrap || "wrap"};
    justify-content: ${(props) => props.$CustomJustifyContent || "center"};
    align-items: ${(props) => props.$CustomAlignItems || "center"};
    gap: ${(props) => props.$CustomGap || "20px"};
  }

  @media (max-width: 768px) {
    flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
    align-items: ${(props) => props.$CustomAlignItems || "center"};

    .allCategories {
      margin-right: ${(props) => props.$CustomMarginRight || "0"};
      margin-bottom: ${(props) => props.$CustomMarginBottom || "10px"};
    }

    .TagsNavegation {
      justify-content: ${(props) => props.$CustomJustifyContent || "center"};
    }
  }
`;

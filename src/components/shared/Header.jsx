import styled from "styled-components";
import Search from "../../pages/search/Search";
import { useTranslation } from "react-i18next";
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
import LanguageSwitcher from "./localization/LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authState.authState);
  const [showConfirmator, setShowConfirmator] = useState(false);

  const loggedUser = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    navigate("/");
    dispatch(resetLoggedUserInfo());
    dispatch(resetSinglePublicProfile());
    dispatch(resetUI());
  };

  const handleSellButton = () => {
    if (isAuthenticated) {
      navigate(`${loggedUser}/new`);
    } else {
      navigate("/login", {
        replace: true,
        state: { from: `/new` },
      });
    }
  };

  const dropdownOptions = [
    { text: t("user_zone"), to: `/${loggedUser}/info`, className: "UserZone" },
    {
      text: t("log_out"),
      onClick: () => {
        setShowConfirmator(true);
      },
      className: "Logout",
    },
  ];

  const TAG_OPTIONS = [
    {
      onClick: () => navigate("/"),
      className: "all",
      text: t("all_categories"),
    },
    {
      text: t("lifestyle"),
      to: `/product/?tags=lifestyle&sell=true`,
      className: "lifestyle",
    },
    {
      text: t("mobile"),
      to: "/product/?tags=mobile&sell=true",
      className: "mobile",
    },
    {
      text: t("motor"),
      to: "/product/?tags=motor&sell=true",
      className: "motor",
    },
    {
      text: t("work"),
      to: "/product/?tags=work&sell=true",
      className: "work",
    },
    {
      text: t("others"),
      to: "/product/?tags=others&sell=true",
      className: "others",
    },
  ];

  const filteredTagOptions = TAG_OPTIONS.filter(
    (tag) => tag.text !== t("all_categories")
  );

  return (
    <>
      {showConfirmator && (
        <Confirmator
          textValue={t("confirm_logout")}
          onConfirm={handleLogout}
          sethiden={() => setShowConfirmator(false)}
          hidden={showConfirmator}
          $blurerBackgroundColor="var(--primary-200)"
          $blurerHeight="150%"
          $customBorder="1px solid var(--primary-300)"
          $customBackground="var(--bg-100)"
        />
      )}
      <HeaderStyledContainer>
        <StyledNav className="d-flex align-items-center w-100">
          <Logo
            $CustomWidth="20%"
            $customImageWidth="45%"
            $customImageHeight="45%"
          />
          <SearchContainer>
            <Search />
          </SearchContainer>
          {isAuthenticated ? (
            <>
              <HeartLink
                to={"/myaccount"}
                size={30}
                className="heartHead"
              />
              <EmailLink
                to={`/${loggedUser}/chat`}
                size={35}
                className="emailHead"
              />
              <LanguageSwitcher flag />
              <DropdownLink
                options={dropdownOptions}
                className="myAccount"
                $CustomWidth="130px"
                dividerWith="128%"
              >
                {t("user_zone")}
              </DropdownLink>
              <RegularButton
                onClick={handleSellButton}
                className="sellButton"
                $customMargin="0px 25px"
                $customBackground="var(--accent-100)"
                $customBorder="none"
                $customColor="var(--bg-100)"
              >
                {t("sell_buy")}
              </RegularButton>
            </>
          ) : (
            <>
              <LanguageSwitcher
                $marginContainer="0 1rem 0 0"
                $gap="5px"
                flag
              />
              <RegularButton
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
                className="login"
                $backgroundColor="var(--primary-200)"
              >
                {t("login_register")}
              </RegularButton>
              <RegularButton
                onClick={handleSellButton}
                className="sellButton"
                $customMargin="0px 25px"
                $customBackground="var(--accent-100)"
                $customBorder="none"
                $customColor="var(--bg-100)"
              >
                {t("sell_buy")}
              </RegularButton>
            </>
          )}
        </StyledNav>

        <StyledTagsNavContainer>
          <DropdownLink
            options={TAG_OPTIONS}
            className="allCategories"
            $CustomMargin="10px"
            $CustomWidth="140px"
          >
            {t("all_categories")}
          </DropdownLink>
          <TagsNav
            className="tagsNavegation"
            options={filteredTagOptions}
          />
        </StyledTagsNavContainer>
      </HeaderStyledContainer>
    </>
  );
};

export default Header;

const HeaderStyledContainer = styled.div`
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

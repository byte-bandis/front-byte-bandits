import styled from "styled-components";
import SearchByadTitle from "./filters/SearchByadTitle";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import { logout } from "../../pages/auth/service";
import DropdownLink from "./DropdownLink";
import { resetLoggedUserInfo } from "../../store/authSlice";
import { resetSinglePublicProfile } from "../../store/singlePublicProfileSlice";
import TagsNav from "./TagsNav";
import { resetUI } from "../../store/uiSlice";
import Confirmator from "./Confirmator";
import { useState, useEffect } from "react";
import FilterHeaderOptions from "./filters/FilterHeaderOptions";
import { MenuApp } from "react-bootstrap-icons";
import ButtonsComponent from "./ButtonsComponent";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [showConfirmator, setShowConfirmator] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adTitleUrlParams = urlParams.get("adTitle");
    const tagsUrlParams = urlParams.get("tags");

    setIsSearching(!!adTitleUrlParams || !!tagsUrlParams);
  }, [location.search]);

  const handleSearching = () => {
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setIsSearching(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    dispatch(resetLoggedUserInfo());
    dispatch(resetSinglePublicProfile());
    dispatch(resetUI());
  };

 


  const TAG_OPTIONS = [
    {
      onClick: () => navigate("/"),
      className: "all",
      text: t("all_categories"),
    },
    {
      text: t("lifestyle"),
      to: `/product/?tags=lifestyle`,
    },
    {
      text: t("mobile"),
      to: "/product/?tags=mobile",
    },
    {
      text: t("motor"),
      to: "/product/?tags=motor",
    },
    {
      text: t("work"),
      to: "/product/?tags=work",
    },
    {
      text: t("others"),
      to: "/product/?tags=others",
    },
  ];

  const tagsOptions = TAG_OPTIONS.filter(
    (tag) => tag.text !== t("all_categories"),
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

      <HeaderStyledContainer
        $CustomMargin=" 0 auto"
        $CustomPadding=".4rem 2%"
        $CustomWidth="100%"
        $CustomBorderBottom="1px dotted var(--primary-100)"
      >
        <Logo
          $CustomWidth="15%"
          $customImageWidth="80%"
          $customImageHeight="80%"
        />

        <div
          className="headercontiner"
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <StyledNav
            className="nav"
            $CustomGap="10px"
            $CustomJustifyContent="space-between"
          >
            <DropdownLink
              options={TAG_OPTIONS}
              className="allCategoriesBurger"
              $CustomWidth="40px"
              $CustomGap="10px"
            >
              <MenuApp size={20} />
            </DropdownLink>
            <SearchContainer className="search">
              <SearchByadTitle
                className="searchByadTitle"
                onSearch={handleSearching}
                onClear={handleClearSearch}
              />
            </SearchContainer>
              <ButtonsComponent
              navigate={navigate}
              setShowConfirmator={setShowConfirmator}
            /> 

             

          </StyledNav>
          <StyledTagsNavContainer
            $CustomGap="10px"
            $CustomJustifyContent="space-between"
          >
            <DropdownLink
              options={TAG_OPTIONS}
              className="allCategories"
              $CustomWidth="120px"
              $CustomGap="10px"
            >
              {t("all_categories")}
            </DropdownLink>
            {isSearching ? (
              <FilterHeaderOptions />
            ) : (
              <TagsNav options={tagsOptions}></TagsNav>
            )}
          </StyledTagsNavContainer>
        </div>

        

          

      </HeaderStyledContainer>
    </>
  );
};

export default Header;

const HeaderStyledContainer = styled.div`
  position: ${(props) => props.$CustomPosition || "sticky"};
  top: ${(props) => props.$CustomTop || 0};
  left: ${(props) => props.$CustomLeft || 0};
  right: ${(props) => props.$CustomRight || 0};
  padding: ${(props) => props.$CustomPadding || "0"};
  display: ${(props) => props.$CustomDisplay || "flex"};
  border: ${(props) => props.$CustomBorder || "none"};
  border-bottom: ${(props) => props.$CustomBorderBottom || "none"};
  justify-content: ${(props) => props.$CustomJustifyContent || "space-between"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  width: ${(props) => props.$CustomWidth || "auto"};
  z-index: ${(props) => props.$CustomZIndex || 2000};
  background-color: ${(props) =>
    props.$customBackGroundColor || "var(--bg-100)"};
  margin: ${(props) => props.$CustomMargin || 0};
  @media (max-width: 800px) {
     width: 100%;
    }

`;

const StyledNav = styled.nav`
  display: ${(props) => props.$CustomDisplay || "flex"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  justify-content: ${(props) => props.$CustomJustifyContent || "center"};
  width: ${(props) => props.$CustomWidth || "100%"};
  gap: ${(props) => props.$CustomGap || "0px"};
  .allCategoriesBurger {
    display: none;
    @media (max-width: 800px) {
      display: block;
    }
  }
   
`;

const SearchContainer = styled.div`
display: ${(props) => props.$CustomDisplay || "flex"};
  margin: ${(props) => props.$CustomMargin || "0"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  justify-content: ${(props) => props.$CustomJustifyContent || "space-between"};
  width: ${(props) => props.$CustomWidth || "auto"};
   flex: 1;
`;

const StyledTagsNavContainer = styled.div`
  gap: ${(props) => props.$CustomGap || "0px"};
  position: ${(props) => props.$CustomPosition || "initial"};
  top: ${(props) => props.$CustomTop || "60px"};
  left: ${(props) => props.$CustomLeft || 0};
  right: ${(props) => props.$CustomRight || 0};
  display: ${(props) => props.$CustomDisplay || "flex"};
  justify-content: ${(props) => props.$CustomJustifyContent || "flex-start"};
  align-items: ${(props) => props.$CustomAlignItems || "center"};
  width: ${(props) => props.$CustomWidth || "auto"};
  background-color: ${(props) =>
    props.$customBackGroundColor || "var(--bg-100)"};
  .allCategories {
    margin-right: ${(props) => props.$CustomMarginRight || "0"};
    
  }

  .TagsNavegation {
    display: ${(props) => props.$CustomDisplay || "flex"};
    flex-wrap: ${(props) => props.$CustomFlexWrap || "wrap"};
    justify-content: ${(props) => props.$CustomJustifyContent || "center"};
    align-items: ${(props) => props.$CustomAlignItems || "center"};
    gap: ${(props) => props.$CustomGap || "20px"};
    
  }
@media (max-width: 800px) {
      display: none;
    }
  
`;

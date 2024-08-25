import styled from "styled-components";
import Search from "../../pages/search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo";
import CustomButton from "./CustomButton";
import EmailLink from "./EmailLink";
import HeartLink from "./HeartLink";
import { logout } from "../../pages/auth/service";
import DropdownLink from "./DropdownLink";
import { resetLoggedUserInfo } from "../../store/authSlice";
import { resetSinglePublicProfile } from "../../store/singlePublicProfileSlice";
import TagsNav from "./TagsNav";
import { getLoggedUserName } from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authState.authState);

  const loggedUser = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure to close your session?");
    if (confirmed) {
      logout();
      dispatch(resetLoggedUserInfo());
      dispatch(resetSinglePublicProfile());
      dispatch(resetUI());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const dropdownOptions = [
    { text: "User Zone", to: `${loggedUser}/myaccount`, className: "UserZone" },
    { text: "Log out", onClick: handleLogout, className: "Logout" },
  ];

  const TAG_OPTIONS = [
    {
      to: "/",
      className: "all",
      text: "All categories",
    },
    {
      to: `${loggedUser}/myaccount`,
      className: "lifestyle",
      text: "lifestyle",
    },
    {
      to: `${loggedUser}/myaccount`,
      className: "mobile",
      text: "mobile",
    },
    { to: `${loggedUser}/myaccount`, className: "motor", text: "motor" },
    { to: `${loggedUser}/myaccount`, className: "work", text: "work" },
    {
      to: `${loggedUser}/myaccount`,
      className: "others",
      text: "others",
    },
  ];

  const filteredTagOptions = TAG_OPTIONS.filter(
    (tag) => tag.text !== "All categories",
  );

  return (
    <>
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
              <DropdownLink options={dropdownOptions} className="myAccount">
                My account
              </DropdownLink>
              <CustomButton
                to={`${loggedUser}/new`}
                className="sellButton"
                marginLeft="25px"
                backgroundColor="var(--accent-100)"
              >
                Sell - Buy
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton
                to="/login"
                state={{ from: location }}
                className="login"
                backgroundColor="var(--primary-200)"
              >
                Login or register
              </CustomButton>
              <CustomButton
                to="/login"
                className="sellButton"
                marginLeft="25px"
                backgroundColor="var(--accent-100)"
              >
                Sell - Buy
              </CustomButton>
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
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchContainer = styled.div`
  flex-grow: 1;
  margin: 0 15px;
`;

const StyledTagsNavContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  .allCategories {
    margin-right: 20px;
  }

  .TagsNavegation {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .allCategories {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .TagsNavegation {
      justify-content: center;
    }
  }
`;

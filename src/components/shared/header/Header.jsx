import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from "./header.module.css";
import Search from "../../../pages/search/Search";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../logo/Logo";
import CustomButton from "../CustomButton";
import EmailLink from "../EmailLink";
import HeartLink from "../HeartLink";
import { logout } from "../../../pages/auth/service";
import DropdownLink from "../DropdownLink";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetLoggedUserInfo } from "../../../store/authSlice";
import { resetSinglePublicProfile } from "../../../store/singlePublicProfileSlice";
import TagsNav from "../TagsNav";
import { getLoggedUserName } from "../../../store/selectors";
import { resetUI } from "../../../store/uiSlice";

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
    (tag) => tag.text !== "All categories"
  );

  return (
    <>
      <Container
        className={`${styles.mainNav} d-flex justify-content-between align-items-center`}
        fluid
      >
        <Nav className="d-flex align-items-center w-100">
          <Logo className={styles.Logo} />
          <div className="flex-grow-1 mx-3">
            <Search />
          </div>
          {isAuthenticated ? (
            <>
              <HeartLink
                to={"/myaccount"}
                size={30}
                className={styles.heartHead}
              />
              <EmailLink
                size={40}
                className={styles.emailHead}
                to={"/myaccount"}
              />
              <DropdownLink
                options={dropdownOptions}
                className={styles.myAccount}
              >
                My account
              </DropdownLink>
              <CustomButton
                to="/username/new"
                className={styles.sellButton}
              >
                Sell - Buy
              </CustomButton>
            </>
          ) : (
            <>
              <CustomButton
                to="/login"
                state={{ from: location }}
                className={styles.login}
              >
                Login or register
              </CustomButton>
              <CustomButton
                to="/username/new"
                className={styles.sellButton}
                variant={"success"}
              >
                Sell - Buy
              </CustomButton>
            </>
          )}
        </Nav>
      </Container>
      <Container
        className={`${styles.TagsNav} d-flex justify-content-left align-items-center`}
        fluid
      >
        <DropdownLink
          options={TAG_OPTIONS}
          className={styles.allCategories}
        >
          All categories
        </DropdownLink>
        <TagsNav
          className={styles.TagsNavegation}
          options={filteredTagOptions}
        ></TagsNav>
      </Container>
    </>
  );
};

export default Header;

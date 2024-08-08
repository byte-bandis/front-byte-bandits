import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./header.module.css";
import Search from "../search/Search";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../logo/Logo";
import CustomButton from "../CustomButton";
import EmailLink from "../EmailLink";
import HeartLink from "../HeartLink";
import { logout } from "../../../pages/auth/service";
import DropdownLink from "../DropdownLink";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authState.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure to close your session?");
    if (confirmed) {
      logout();
      dispatch(setAuth(false));
      navigate("/");
    }
  };

  const dropdownOptions = [
    { text: "User Zone", to: "/myaccount", className: "UserZone" },
    { text: "Log out", onClick: handleLogout, className: "Logout" },
  ];

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
              <CustomButton to="/username/new" className={styles.sellButton}>
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
      <Navbar expand="lg" className={styles.header}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/product">
                Product
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="#action/3.1">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./header.module.css";
import Search from "../molecules/search/Search";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../atoms/logo/Logo";
import CustomButton from "../atoms/button/CustomButton";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.authState.authState);

  return (
    <>
      <Container
        className={`${styles.mainNav} d-flex justify-content-between align-items-center`}
      >
        <div className="d-flex align-items-center">
          <Logo />
          <Search />
        </div>
        <Nav className="d-flex align-items-center">
          {isAuthenticated ? (
            <>
              <CustomButton to="/userdemo" className={styles.myAccount}>
                My account
              </CustomButton>
              <CustomButton to="/username/new" className={styles.sellButton}>
                Sell
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
              <CustomButton to="/username/new" className={styles.sellButton}>
                Sell
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

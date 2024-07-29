import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./header.module.css";
import Search from "../search/Search";
import { logout } from "../../pages/auth/service";
import { setAuth } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.authState.authState);

  const handleLogout = () => {
    logout();
    dispatch(setAuth(false));
    navigate("/");
  };

  return (
    <>
      <Container className="top-header d-flex flex-row justify-content-end">
        <Nav>
          {isAuthenticated ? (
            <>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  href="#"
                  onClick={handleLogout}
                >
                  LogOut
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  href="/userdemo"
                >
                  My account
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
      <Navbar
        expand="lg"
        className={styles.header}
      >
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/product">Product</Nav.Link>
              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Search />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../store/selectors";
import { getPublicProfiles } from "./service";
import { useEffect } from "react";
import { getProfilesWithThunk } from "../../store/publicProflesThunk";

const HeaderProfile = () => {
  const loggedUser = useSelector(getLoggedUser);
  const userName = loggedUser.userName;

  return (
    <>
      <Container className="top-header d-flex flex-row justify-content-start">
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${userName}/info`}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${userName}/info/mydata`}
            >
              Account
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
};

export default HeaderProfile;

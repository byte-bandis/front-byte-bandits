import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getLoggedUser } from "../../store/selectors";
/* import { getPublicProfiles } from "./service";
import { useEffect } from "react";
import { getProfilesWithThunk } from "../../store/publicProflesThunk";
 */
const HeaderProfile = () => {
  const loggedUser = useSelector(getLoggedUser);
  const { username } = useParams();
  const myProfile = username === loggedUser.username ? username : null;

  return (
    <>
      <Container className="top-header d-flex flex-row justify-content-start">
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${myProfile}/info`}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${myProfile}/info/mydata`}
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

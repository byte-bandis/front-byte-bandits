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
  const { username } = useParams();
  console.log("esto es username de los parámetros: ", username);
  return (
    <>
      <Container className="top-header d-flex flex-row justify-content-start">
        <Nav>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${username}/info`}
            >
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/${username}/info/mydata`}
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

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const HeaderProfile = () => {
  const userName = "pocholo";

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

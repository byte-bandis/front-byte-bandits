import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import { getLoggedUserName } from "../../store/selectors";
import { useSelector } from "react-redux";

const AccountMenu = () => {
  const loggedUserName = useSelector(getLoggedUserName);
  const { username } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-end">
          {loggedUserName === username && (
            <Button
              variant="primary"
              onClick={handleShow}
            >
              Account menu
            </Button>
          )}

          <Offcanvas
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Private Zone</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand
                    as={Link}
                    to={`/${loggedUserName}/info`}
                  >
                    My Profile
                  </Navbar.Brand>
                </Container>
              </Navbar>

              <Navbar className="bg-body-tertiary">
                <Container>
                  <Navbar.Brand>Brand text</Navbar.Brand>
                </Container>
              </Navbar>

              <Navbar className="bg-body-tertiary">
                <Container>
                  <Link to={`/${loggedUserName}/whishlist`}>Wishlist</Link>
                </Container>
              </Navbar>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Link to={`/${loggedUserName}/new`}>New</Link>
                </Container>
              </Navbar>
              <Navbar className="bg-body-tertiary">
                <Container>
                  <Link to={`/${loggedUserName}/delete-account`}>
                    Delete account
                  </Link>
                </Container>
              </Navbar>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default AccountMenu;

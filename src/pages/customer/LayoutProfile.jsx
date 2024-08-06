import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const LayoutProfile = () => {
  return (
    <>
      <Container>
        <Row>
          <h1 className="display-5 fw-bold">Your profile</h1>
          <p>Here you can see and change your profile data</p>
          <Outlet />
        </Row>
      </Container>
    </>
  );
};

export default LayoutProfile;

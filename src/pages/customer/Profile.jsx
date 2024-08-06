import Col from "react-bootstrap/Col";

const Profile = () => {
  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your profile</h1>
          <p className="col-md-8 fs-4">
            Using a series of utilities, you can create this jumbotron, just
            like the one in previous versions of Bootstrap. Check out the
            examples below for how you can remix and restyle it to your liking.
          </p>
        </div>
      </Col>
    </>
  );
};

export default Profile;

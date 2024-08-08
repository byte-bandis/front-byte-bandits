import Col from "react-bootstrap/Col";

const Profile = () => {
  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          <ul className="col-md-8 fs-4">
            <li>Una foto de perfil</li>
            <li>Una foto de portada</li>
            <li>Información pública</li>
          </ul>
        </div>
      </Col>
    </>
  );
};

export default Profile;

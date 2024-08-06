import Col from "react-bootstrap/Col";

const PersonalInfo = () => {
  return (
    <>
      <Col>
        <div className="container-fluid py-5">
          <p className="col-md-8 fs-4">
            Formulario
            <ul>
              <li>Fecha de nacimiento</li>
              <li>Tarjeta de crédito guardada</li>
              <li>Email</li>
            </ul>
          </p>
        </div>
      </Col>
    </>
  );
};

export default PersonalInfo;

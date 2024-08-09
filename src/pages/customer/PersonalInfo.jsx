import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../store/selectors";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector(getMyProfile);

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

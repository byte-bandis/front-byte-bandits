import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import HeaderProfile from "./HeaderProfile";
import { useSelector } from "react-redux";
import { getMyProfile } from "../../store/selectors";

const LayoutProfile = () => {
  const myProfile = useSelector(getMyProfile);
  return (
    <>
      <Container>
        <Row>
          {
            <h1 className="display-5 fw-bold">
              {myProfile.username}, this is your profile
            </h1>
          }
          <p>Here you can see and change your profile data</p>
          <HeaderProfile />
          <Outlet />
        </Row>
      </Container>
    </>
  );
};

export default LayoutProfile;

import { Outlet, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import HeaderProfile from "./HeaderProfile";
import { useSelector } from "react-redux";
import {
  getLoggedUserName,
  getSinglePublicProfile,
} from "../../store/selectors";

const LayoutProfile = () => {
  const loggedUserName = useSelector(getLoggedUserName);
  const myPublicProfile = useSelector(getSinglePublicProfile);
  const { username } = useParams();
  console.log("Esto es myPublicProfile en el layourProfile: ", myPublicProfile);

  return (
    <>
      <Container>
        {loggedUserName ? (
          <Row>
            {
              <h1 className="display-5 fw-bold">
                {loggedUserName}, this is your profile
              </h1>
            }
            <p>Here you can see and change your profile data</p>
            <HeaderProfile />
            <Outlet />
          </Row>
        ) : (
          `No info found for user ${username}`
        )}
      </Container>
    </>
  );
};

export default LayoutProfile;

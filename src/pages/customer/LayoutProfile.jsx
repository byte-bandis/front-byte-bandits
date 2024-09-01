import { Outlet, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import HeaderProfile from "./HeaderProfile";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import StyledMyAccount from "../../components/shared/StyledMyAccount";

const LayoutProfile = () => {
  const loggedUserName = useSelector(getLoggedUserName);
  const { username } = useParams();

  return (
    <>
      <StyledMyAccount>
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
      </StyledMyAccount>
    </>
  );
};

export default LayoutProfile;

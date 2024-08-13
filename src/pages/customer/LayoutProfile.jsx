import { Outlet, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import HeaderProfile from "./HeaderProfile";
import { useSelector } from "react-redux";
import { getMyAccount } from "../../store/selectors";

const LayoutProfile = () => {
  const myAccount = useSelector(getMyAccount);
  const { username } = useParams();
  return (
    <>
      <Container>
        {myAccount.username ? (
          <Row>
            {
              <h1 className="display-5 fw-bold">
                {myAccount.username}, this is your profile
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

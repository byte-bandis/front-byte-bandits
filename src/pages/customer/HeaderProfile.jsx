import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/shared/CustomButton";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";

const HeaderProfile = () => {
  const loggedUserName = useSelector(getLoggedUserName);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUserName !== username) {
      navigate(`/${username}`);
    }
  }, [loggedUserName, username, navigate]);

  return (
    <>
      <Container className="top-header d-flex flex-row justify-content-start gap-3">
        <Nav>
          <Nav.Item>
            <CustomButton to={`/${username}/info`}>
              Your public profile
            </CustomButton>
          </Nav.Item>
          <Nav.Item>
            <CustomButton to={`/${username}/info/mydata`}>
              Your account info
            </CustomButton>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
};

export default HeaderProfile;

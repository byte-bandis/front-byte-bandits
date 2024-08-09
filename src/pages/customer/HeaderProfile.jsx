import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom";
import CustomButton from "../../components/shared/CustomButton";

const HeaderProfile = () => {
  const { username } = useParams();
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

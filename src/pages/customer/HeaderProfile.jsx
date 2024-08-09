import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getLoggedUser } from "../../store/selectors";
import CustomButton from "../../components/shared/CustomButton";
/* import { getPublicProfiles } from "./service";
import { useEffect } from "react";
import { getProfilesWithThunk } from "../../store/publicProflesThunk";
 */
const HeaderProfile = () => {
  const { username } = useParams();
  console.log("esto es username de los parámetros: ", username);
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

import { Outlet, useNavigate, useParams } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import ReplaceHeaderSpace from "../../components/shared/ReplaceHeaderSpace";

const LayoutAccount = () => {
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
      <ReplaceHeaderSpace></ReplaceHeaderSpace>
      <Container>
        <Row>
          <AccountMenu />
          <Outlet />
        </Row>
      </Container>
    </>
  );
};

export default LayoutAccount;

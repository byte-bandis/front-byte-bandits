import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import StyledContainer from "../../components/shared/StyledContainer";

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
      <StyledContainer
        $customDisplay="flex"
        $customFlexDirection="row"
        $customAlignItems="start"
        
      >
        <Outlet />
      </StyledContainer>
    </>
  );
};

export default LayoutAccount;

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import RegularButton from "../../components/shared/buttons/RegularButton";
import ButtonContainer from "../../components/shared/buttons/ButtonContainer";

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
      <ButtonContainer $justifyContent="flex-start">
        <RegularButton
          as={Link}
          to={`/${username}/info`}
        >
          Your public profile
        </RegularButton>
        <RegularButton
          as={Link}
          to={`/${username}/info/mydata`}
        >
          Your account info
        </RegularButton>
      </ButtonContainer>
    </>
  );
};

export default HeaderProfile;

import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import RegularButton from "../../components/shared/buttons/RegularButton";
import ButtonContainer from "../../components/shared/buttons/ButtonContainer";

const HeaderProfile = () => {
  const { t } = useTranslation();
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
          {t("your_public_profile")}
        </RegularButton>
        <RegularButton
          as={Link}
          to={`/${username}/info/mydata`}
        >
          {t("your_private_data")}
        </RegularButton>
      </ButtonContainer>
    </>
  );
};

export default HeaderProfile;

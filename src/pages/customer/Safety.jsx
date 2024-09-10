import RegularButton from "../../components/shared/buttons/RegularButton.jsx";
import StyledContainer from "../../components/shared/StyledContainer";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import PasswordUpdater from "./myPersonalInfo/components/PasswordUpdater.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors.js";
import { Link } from "react-router-dom";

const Safety = () => {
  const { t } = useTranslation();
  const loggedUserName = useSelector(getLoggedUserName);

  return (
    <StyledMyAccount>
      <StyledContainer $customMargin="2rem 0 0 1rem">
        <h1>{t("safety")}</h1>
        <p>{t("safety_intro")}</p>
        <PasswordUpdater />
      </StyledContainer>
      <StyledContainer
        $customWidth="80%"
        $customDisplay="flex"
        $customMargin="2rem 2rem 0 0"
        $customJustifyContent="flex-end"
        $customFlexDirection="row"
      >
        <RegularButton
          $variant="danger"
          as={Link}
          to={`/${loggedUserName}/delete-account`}
        >
          {t("delete_my_account")}
        </RegularButton>
      </StyledContainer>
    </StyledMyAccount>
  );
};

export default Safety;

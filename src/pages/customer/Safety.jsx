import StyledContainer from "../../components/shared/StyledContainer";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import PasswordUpdater from "./myPersonalInfo/components/PasswordUpdater.jsx";
import { useTranslation } from "react-i18next";
const Safety = () => {
  const { t } = useTranslation();
  return (
    <StyledMyAccount>
      <StyledContainer
        $customMarginTop="2rem"
        $customMarginLeft="1rem"
      >
        <h1>{t("safety")}</h1>
        <p>{t("safety_intro")}</p>
        <PasswordUpdater />
      </StyledContainer>
    </StyledMyAccount>
  );
};

export default Safety;

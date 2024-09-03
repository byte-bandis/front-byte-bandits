import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";
import MyData from "./myPersonalInfo/components/UserData";
import StyledContainer from "../../components/shared/StyledContainer";
import FixedPositionAlert from "../../components/shared/alerts/FixedPositionAlert";
import { getUIState } from "../../store/selectors";
import PasswordUpdater from "./myPersonalInfo/components/PasswordUpdater.jsx";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const uiState = useSelector(getUIState);

  return (
    <StyledContainer $customMarginTop="3rem">
      <h1>{t("title_personal_details")}</h1>

      {uiState === "error" && (
        <FixedPositionAlert
          position="top-right"
          $customTop="30%"
          $customRight="10%"
        />
      )}

      <StyledContainer
        $customDisplay="flex"
        $customFlexDirection="column"
        $customAlignItems="left"
        $customMarginTop="1rem"
      >
        <MyData />
        <Address />
        <CreditCard />
        <PasswordUpdater />
      </StyledContainer>
    </StyledContainer>
  );
};

export default PersonalInfo;

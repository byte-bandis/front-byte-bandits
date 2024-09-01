// PersonalInfo.js
import { useSelector } from "react-redux";
import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";
import MyData from "./myPersonalInfo/components/UserData";
import StyledContainer from "../../components/shared/StyledContainer";
import FixedPositionAlert from "../../components/shared/alerts/FixedPositionAlert";
import { getUIState } from "../../store/selectors";

const PersonalInfo = () => {
  const uiState = useSelector(getUIState);

  return (
    <StyledContainer $customMarginTop="3rem">
      <h1>These are your personal details</h1>

      {uiState === "error" && (
        <FixedPositionAlert
          position="top-right"
          $customTop="25%"
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
      </StyledContainer>
    </StyledContainer>
  );
};

export default PersonalInfo;

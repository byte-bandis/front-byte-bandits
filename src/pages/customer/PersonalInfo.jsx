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
    <StyledContainer>
      <h1>These are your personal details</h1>

      {uiState === "error" && (
        <FixedPositionAlert
          position="top-right"
          $customTop="25%"
          $customRight="20px"
        />
      )}

      <StyledContainer
        $customDisplay="flex"
        $customFlexDirection="row"
        $customJustifyItems="flex-start"
      >
        <MyData />
      </StyledContainer>
      <Address />
      <CreditCard />
    </StyledContainer>
  );
};

export default PersonalInfo;

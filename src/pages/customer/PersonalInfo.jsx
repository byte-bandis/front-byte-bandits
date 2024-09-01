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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="bi bi-person-square"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>
      </StyledContainer>
      <Address />
      <CreditCard />
    </StyledContainer>
  );
};

export default PersonalInfo;

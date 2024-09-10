import PulseLoader from "react-spinners/PulseLoader";
import StyledContainer from "../StyledContainer";

const CustomPulseLoader = (isLoading) => {
  return (
    <StyledContainer
      $customDisplay="flex"
      $customJustifyContent="center"
    >
      <PulseLoader
        color={"var(--primary-200)"}
        loading={isLoading}
        size={15}
      />
    </StyledContainer>
  );
};
export default CustomPulseLoader;

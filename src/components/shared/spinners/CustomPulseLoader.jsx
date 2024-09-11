import PulseLoader from "react-spinners/PulseLoader";
import StyledContainer from "../StyledContainer";
import PropTypes from "prop-types";

const CustomPulseLoader = ({ isLoading, ...props }) => {
  return (
    <StyledContainer
      $customDisplay="flex"
      $customJustifyContent="center"
      {...props}
    >
      <PulseLoader
        color={"var(--primary-200)"}
        loading={isLoading}
        size={15}
      />
    </StyledContainer>
  );
};

CustomPulseLoader.propTypes = {
  isLoading: PropTypes.bool,
};

export default CustomPulseLoader;

import Flag from "react-world-flags";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledFlag = styled(Flag)`
  width: ${(props) => props.$customWidth || "50px"};
  height: ${(props) => props.$customHeight || "30px"};
  object-fit: cover;
`;

const FlagSelector = ({ countryCode, customWidth, customHeight }) => {
  return (
    <StyledFlag
      code={countryCode}
      $customWidth={customWidth}
      $customHeight={customHeight}
    />
  );
};

FlagSelector.propTypes = {
  countryCode: PropTypes.string.isRequired,
  customWidth: PropTypes.string,
  customHeight: PropTypes.string,
};

export default FlagSelector;

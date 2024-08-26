import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  display: flex;
  margin: ${({ marginContainer }) => marginContainer || "0"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  gap: ${({ gap }) => gap || "10px"};
`;

ButtonContainer.propTypes = {
  marginContainer: PropTypes.string,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  gap: PropTypes.string,
};

export default ButtonContainer;

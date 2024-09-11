import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonContainer = styled.div`
  display: flex;
  background: ${(props) => props.$backgrounContainer || "transparent"};
  width: ${(props) => props.$widthContainer || "100%"};
  margin: ${(props) => props.$marginContainer || "0"};
  flex-direction: ${(props) => props.$flexDirection || "row"};
  justify-content: ${(props) => props.$justifyContent || "center"};
  align-items: ${(props) => props.$alignItems || "center"};
  gap: ${(props) => props.$gap || "5%"};

  @media (max-width: 768px) {
    flex-direction: ${(props) => props.$flexDirectionMobile || "column"};
    gap: ${(props) => props.$gapMobile || "0"};
    padding: ${(props) => props.$paddingMobile || "0"}
    margin: ${(props) => props.$marginMobile || "0"}
  }
`;

ButtonContainer.propTypes = {
  marginContainer: PropTypes.string,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  gap: PropTypes.string,
};

export default ButtonContainer;

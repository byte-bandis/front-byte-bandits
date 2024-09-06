import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTextarea = styled.textarea`
  width: ${(props) => props.$customWidth || "100%"};
  height: ${(props) => props.$customHeight || "100%"};
  padding: ${(props) => props.$customPadding || "1rem"};
  border: ${(props) => props.$customBorder || "1px dotted var(--primary-300)"};
  border-radius: ${(props) => props.$customBorderRadius || "8px"};
  box-sizing: ${(props) => props.$customBoxSizing || "border-box"};
  resize: ${(props) => props.$customResize || "horizontal"};
  font-size: ${(props) => props.$customFontSize || "1rem"};
  line-height: ${(props) => props.$customLineHeight || "1.5"};
  background-color: ${(props) => props.$customBackgroundColor || "#f9f9f9"};
  color: ${(props) => props.$customTextColor || "black"};
  outline: ${(props) => props.$customOutline || "none"};
  transition: ${(props) => props.$customTransition || "border-color 0.3s ease"};

  &:hover {
    border-color: ${(props) =>
      props.$customHoverBorderColor || "var(--primary-200)"};
  }

  &:focus {
    border-color: ${(props) =>
      props.$customFocusBorderColor || "var(--primary-100)"};
    background-color: ${(props) => props.$customFocusBackgroundColor || "#fff"};
  }

  &::placeholder {
    font-style: italic;
    color: ${(props) => props.$customPlaceholderColor || "gray"};
  }
`;

StyledTextarea.propTypes = {
  $customWidth: PropTypes.string,
  $customHeight: PropTypes.string,
  $customPadding: PropTypes.string,
  $customBorder: PropTypes.string,
  $customBorderRadius: PropTypes.string,
  $customBoxSizing: PropTypes.string,
  $customResize: PropTypes.oneOf(["none", "both", "horizontal", "vertical"]),
  $customFontSize: PropTypes.string,
  $customLineHeight: PropTypes.string,
  $customBackgroundColor: PropTypes.string,
  $customTextColor: PropTypes.string,
  $customOutline: PropTypes.string,
  $customTransition: PropTypes.string,
  $customHoverBorderColor: PropTypes.string,
  $customFocusBorderColor: PropTypes.string,
  $customFocusBackgroundColor: PropTypes.string,
  $customPlaceholderColor: PropTypes.string,
};

export default StyledTextarea;

import styled from "styled-components";

const RegularButton = styled.button`
  cursor: ${(props) => props.$customCursor || "pointer"};

  background: ${(props) => props.$customBackground || "var(--bg-100)"};
  border: ${(props) => props.$customBorder || "1px solid var(--primary-200)"};
  border-radius: ${(props) => props.$customBorderRadius || "5px"};
  margin: ${(props) => props.$customMargin || "0"};
  
  padding: ${(props) => props.$customVerticalPadding || ".3rem"};
  color: ${(props) => props.$customColor || "var(--text-100)"};
  text-align: center;
  display: inline-block;
  font-size: ${(props) => props.$customfontsize || "16px"};

  height: fit-content;
  width: ${(props) => props.$customwidth || "fit-content"};
  transition: ${(props) =>
    props.$customTransition || "background-color .3s ease, color .3s ease"};
  
  &:hover {
    transform: scale(0.96));
  background-color: ${(props) =>
    props.$customHoverBackgroundColor || "var(--primary-200)"};
  color: ${(props) => props.$customHoverColor || "var(--bg-100)"};
  }
  
  &:focus {
  background: ${(props) =>
    props.$customFocusBackground || "var(--primary-200)"};
  color: ${(props) => props.$customFocusColor || "var(--bg-100)"};
  }

  &:active {
  background: ${(props) =>
    props.$customActiveBackground || "var(--primary-100)"};
  color: ${(props) => props.$customActiveColor || "var(--bg-100)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: scale(1);
    background-color: ${(props) =>
      props.$customDisableBackGroundColor || "var(--bg-200)"};
    color: ${(props) => props.$customDisabledColor || "var(--text-100)"};
    border: ${(props) =>
      props.$customDisabledBorder || "1px solid var(--bg-200)"};
  }
`;

export default RegularButton;

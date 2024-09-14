import styled from "styled-components";

const RegularButton = styled.button`
  cursor: ${(props) => props.$customCursor || "pointer"};
  border-radius: ${(props) => props.$customBorderRadius || "5px"};
  margin: ${(props) => props.$customMargin || "0"};
  padding: ${(props) => props.$customVerticalPadding || ".3rem"};
  text-align: center;
  display: inline-block;
  font-size: ${(props) => props.$customfontsize || "16px"};
  height: fit-content;
  width: ${(props) => props.$customwidth || "fit-content"};
  font-weight: ${(props) => props.$customFontWeight || "500"};
  transition: ${(props) =>
    props.$customTransition || "background-color .3s ease, color .3s ease"};
  text-wrap: nowrap;

  /* Default or other $variants styles */
  background-color: ${(props) => props.$customBackground || "var(--bg-100)"};
  color: ${(props) => props.$customColor || "var(--primary-300)"};
  border: ${(props) => props.$customBorder || "1px solid var(--primary-200)"};
  @media (max-width: 768px) {
    margin: ${(props) => props.$customMarginMobile || "0"};
  }
  &:hover {
    transform: scale(0.96);
    background-color: ${(props) =>
      props.$customHoverBackgroundColor || "var(--primary-200)"};
    color: ${(props) => props.$customHoverColor || "var(--bg-100)"};
  }

  &:focus {
    background-color: ${(props) =>
      props.$customFocusBackground || "var(--primary-200)"};
    color: ${(props) => props.$customFocusColor || "var(--bg-100)"};
  }

  &:active {
    background-color: ${(props) =>
      props.$customActiveBackground || "var(--primary-100)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: scale(1);
    background-color: ${(props) =>
      props.$customDisableBackGroundColor || "var(--primary-200)"};
    color: ${(props) => props.$customDisabledColor || "var(--text-100)"};
    border: ${(props) =>
      props.$customDisabledBorder || "1px solid var(--bg-200)"};
  }

  /* Danger $variant */
  ${(props) =>
    props.$variant === "danger" &&
    `
    background-color: var(--error-2);
    border: 1px solid var(--error-2);
    color: var(--text-100);

    &:hover {
      background-color: var(--error-1);
      color: var(--text-100-d);
    }

    &:focus {
      background-color: var(--error-1);
    }

    &:active {
      background-color: var(--error-2);
    }
  `}

  /* Attention $variant */
  ${(props) =>
    props.$variant === "attention" &&
    `
    background-color: var(--accent-100);
    border: 1px solid var(--accent-100);
    color: var(--text-100);
    

    &:hover {
      background-color: var(--accent-200);
    }

    &:focus {
      background-color: var(--accent-100);
    }

    &:active {
      background-color: var(--accent-300);
    }
      
  `}

  /* Dark-Green $variant */
  ${(props) =>
    props.$variant === "dark-green" &&
    `
    background-color: var(--primary-100);
    border: 1px solid var(--primary-300);
    color: var(--text-1);

    &:hover {
      background-color: var(--primary-300);
      color: var(--bg-100);
    }

    &:focus {
      background-color: var(--primary-300);
      color: var(--bg-100);
    }

    &:active {
      background-color: var(--primary-100);
    }
  `}
`;

export default RegularButton;

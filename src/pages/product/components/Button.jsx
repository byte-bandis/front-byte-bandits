import styled from "styled-components";


const Button = styled.button`
  cursor: pointer;
  background-color: var(--botton-1);
  border: 1px solid var(--botton-2);
  padding: ${(props) => props.$customVerticalPadding || "0px"} 12px;
  border-radius: 5px;
  color: var(--botton-2);
  text-align: center;
  display: inline-block;
  font-size: ${(props) => props.$customfontsize || "16px"};

  height: fit-content;
  width: ${(props) => props.$customwidth || "fit-content"};
  &:hover {
    transform: scale(0.96);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: scale(1);
    background-color: var(--botton-2);
    color: var(--text-2);
    border: 1px solid var(--botton-1);
  }
`;

export default Button;

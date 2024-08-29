import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    align-items: center;
    justify-content: center;

    background-color: var(--primary-300);
    border: 1px solid var(--accent-100);
    padding: '0px';
    padding-top: ${(props) => props.$cTPadding || '0px'};
    padding-bottom: ${(props) => props.$cBPadding || '0px'};
    padding-left: ${(props) => props.$cLPadding || '12px'};
    padding-right: ${(props) => props.$cRPadding || '12px'};
    border-radius: 5px;
    color: var(--accent-100);
    text-align: center;
    display: inline-block;
    font-size: ${(props) => props.$customfontsize || '16px'};

    height: ${(props) => props.$customheight || 'fit-content'};
    width: ${(props) => props.$customwidth || 'fit-content'};
    min-width: 'fit-content';
    max-width: 'fit-content';
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
    &.active {
        color: var(--botton-1);
        background-color: var(--accent-100);
        border: 1px solid var(--primary-300);
        color: var(--primary-300);
    }

    &CaretRightFill {
        color: var(--botton-2);
    }
`;

export default Button;

import styled from 'styled-components';

const ErrorMessage = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    justify-content: center;
    position: fixed;
    bottom: 100px;
    height: 100px;
    width: fit-content;
    border: 2px dotted var(--accent-200);
    border-radius: 5px;
    background: var(--bg-200);
`;

export default ErrorMessage;

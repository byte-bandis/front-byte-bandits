import styled from "styled-components";

const UsernameOverlay = styled.h2`
  position: absolute;
  top: 25%;
  left: 45%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 1;
`;

export default UsernameOverlay;

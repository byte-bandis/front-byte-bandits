import styled from "styled-components";

const CustomCancelOption = styled.div`
  position: ${(props) => props.$customposition || "relative"};
  top: ${(props) => props.$customtop || "-20px"};
  left: ${(props) => props.$customleft || "0"};
  display: block;
  background: ${(props) => props.$custombackground || "rgba(0, 0, 0, 0.5)"};
  padding: ${(props) => props.$custompadding || "10px"};
  color: ${(props) => props.$customcolor || "white"};
  border: ${(props) => props.$customborder || "5px solid var(--border-1)"};
  border-radius: ${(props) => props.$customborderradius || "none"};
  width: ${(props) => props.$customwidth || "auto"};
  height: ${(props) => props.$customheight || "auto"};
  object-fit: ${(props) => props.$customobjectfit || "cover"};
  cursor: ${(props) => props.$customcursor || "pointer"};
  box-shadow: ${(props) =>
    props.$customboxshadow || "0px 4px 8px rgba(0, 0, 0, 0.2)"};
  z-index: ${(props) => props.$customZIndex || "0"};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    transform: ${(props) => props.$customtransform || "scale(1.05)"};
  }
`;

export default CustomCancelOption;

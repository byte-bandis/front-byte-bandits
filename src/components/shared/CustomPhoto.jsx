import styled from "styled-components";

const CustomPhoto = styled.img`
  border: ${(props) => props.$customborder || "5px solid var(--primary-100)"};
  border-radius: ${(props) => props.$customborderradius || "none"};
  width: ${(props) => props.$customwidth || "100%"};
  height: ${(props) => props.$customheight || "auto"};
  object-fit: ${(props) => props.$customobjectfit || "cover"};
  box-shadow: ${(props) =>
    props.$customboxshadow || "0px 4px 8px rgba(0, 0, 0, 0.2)"};
  display: block;
  transition: ${(props) => props.$customtransition || "transform 0.3s ease"};
  cursor: ${(props) => props.$customcursor || "none"};
  z-index: ${(props) => props.$customZIndex || "0"};

  &:hover {
    transform: ${(props) => props.$customtransform || "scale(1.05)"};
  }
`;

export default CustomPhoto;

import styled from "styled-components";

const DescriptionContainer = styled.div`
  font-size: 1rem;
  color: #333;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background: ${(props) => props.$custombackground || "#f9f9f9"};

  text-align: ${(props) => props.$customtextalign || "left"};
  max-width: ${(props) => props.$custommaxwidth || "600px"};
  word-wrap: break-word;
`;

export default DescriptionContainer;

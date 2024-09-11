import styled from "styled-components";

const StyledAdList = styled.div`
  margin: ${(props) => props.$customMargin || "auto"};
  display: grid;
  position: relative;
  top: ${(props) => props.$customTop || "0px"};
  justify-content: space-between;
  justify-items: center;
  width: 80%;
 max-width: calc(280px * 5);
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  padding-top: 0px;

  &:has(.no-ad[noad]) {
    display: flex;
  }

  .no-ad {
    color: silver;
    text-wrap: nowrap;
    text-align: start;
  }
    
`;

export default StyledAdList;

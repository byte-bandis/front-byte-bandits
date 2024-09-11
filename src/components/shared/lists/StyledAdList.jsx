import styled from "styled-components";

const StyledAdList = styled.div`
  margin: ${(props) => props.$customMargin || "12% auto"};
  display: grid;
  justify-content: space-between;
  justify-items: center;
  width: 80%;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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

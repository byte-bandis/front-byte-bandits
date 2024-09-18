import { useState } from "react";
import styled from "styled-components";
import P from "prop-types";

const DropdownStyled = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer
    $CustomHoverColor="var(--accent-100)"
    $CustomHoverBackgroundColor="var(--bg-300)">
      <DropdownHeader onClick={handleToggleDropdown}>{label}</DropdownHeader>
      {isOpen && <DropdownBody>{children}</DropdownBody>}
    </DropdownContainer>
  );
};
DropdownStyled.propTypes = {
  label: P.string.isRequired,
  children: P.node.isRequired,
};

export default DropdownStyled;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid var(--primary-200);
&:hover {
    background-color: ${(props) =>
      props.$CustomHoverBackgroundColor || "var(--primary-200)"};
    color: ${(props) => props.$CustomHoverColor || "var(--bg-100)"};
  }
`;

const DropdownHeader = styled.div`
  border-radius: 5px;
  width: 120px;  
  cursor: pointer;
  margin: auto;
  text-align: center;
border-radius: 5px;
background-color: var--accent-100);

`;

const DropdownBody = styled.div`
  position: absolute;
  background-color: var(--bg-100);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 120px;
  background-color: #00000000;
`;

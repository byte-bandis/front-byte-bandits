import { useState } from "react";
import styled from "styled-components";
import P from "prop-types";

const DropdownStyled = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
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
  border: 1px solid var(--text-200);
`;

const DropdownHeader = styled.div`
  background-color: var(--background-100);

  padding: 8px 20px;
  cursor: pointer;
`;

const DropdownBody = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 5px;
  width: 120px;
`;

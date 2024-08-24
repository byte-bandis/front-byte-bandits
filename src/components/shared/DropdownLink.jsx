import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownLink = ({ children, className, options, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer className={className}>
      <DropdownToggle onClick={toggleDropdown} {...rest}>
        {children}
      </DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <React.Fragment key={index}>
              <DropdownItem
                as={option.to ? Link : "button"}
                to={option.to}
                onClick={() => {
                  option.onClick && option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.text}
              </DropdownItem>
              {index < options.length - 1 && <DropdownDivider />}
            </React.Fragment>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

DropdownLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ).isRequired,
};

export default DropdownLink;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 5px;
`;

const DropdownToggle = styled.button`
  background-color: var(--primary-200);
  color: var(--botton-2);
  padding: 11px;
  text-align: left;
  border: none;
  border-radius: 5px;

  &:hover,
  %:focus {
    background-color: var(-bg--3);
    color: var(--boton-2);
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--bg-300);
  box-shadow: 0px 8px 16px var(--shadow-1);
  z-index: 1;
  padding: 10% 10% 10% 10%;
  gap: 5px;
  border-radius: 5px;
`;

const DropdownItem = styled.div`
  color: var(--text-100);
  width: 100%;
`;

const DropdownDivider = styled.div`
  border-bottom: 1px solid var(--text-100);
  margin: 0.5rem 0;
  width: 130%;
  margin-left: -12px;
`;

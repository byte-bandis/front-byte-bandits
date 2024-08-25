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
  position: ${({ position }) => position || "relative"};
  display: ${({ display }) => display || "inline-block"};
  padding: ${({ padding }) => padding || "5px"};
`;

const DropdownToggle = styled.button`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--primary-200)"};
  color: ${({ color }) => color || "var(--botton-2)"};
  padding: ${({ padding }) => padding || "11px"};
  text-align: left;
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};

  &:hover,
  &:focus {
    background-color: ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor || "var(-bg--3)"};
    color: ${({ hoverColor }) => hoverColor || "var(--boton-2)"};
  }
`;

const DropdownMenu = styled.div`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  position: ${({ position }) => position || "absolute"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--bg-300)"};
  box-shadow: ${({ boxShadow }) => boxShadow || "0px 8px 16px var(--shadow-1)"};
  z-index: ${({ zIndex }) => zIndex || 1};
  padding: ${({ padding }) => padding || "10% 10% 10% 10%"};
  gap: ${({ gap }) => gap || "5px"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
`;

const DropdownItem = styled.div`
  color: ${({ color }) => color || "var(--text-100)"};
  width: ${({ width }) => width || "100%"};

  &:hover {
    color: ${({ hoverColor }) => hoverColor || "white"};
  }
`;

const DropdownDivider = styled.div`
  border-bottom: ${({ borderBottom }) =>
    borderBottom || "1px solid var(--text-100)"};
  margin: ${({ margin }) => margin || "0.5rem 0"};
  width: ${({ width }) => width || "130%"};
  margin-left: ${({ marginLeft }) => marginLeft || "-12px"};
`;

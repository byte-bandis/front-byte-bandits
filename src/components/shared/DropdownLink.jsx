import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownLink = ({ children, className, options, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option) => {
    if (option.onClick) {
      console.log("onClick dropdown");
      option.onClick();
      console.log("onClick executed");
    }
    if (option.to) {
      setIsOpen(false);
    }
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
                onClick={() => handleItemClick(option)}
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
  position: ${(props) => props.$CustomPosition || "relative"};
  display: ${(props) => props.$CustomDisplay || "inline-block"};
  padding: ${(props) => props.$CustomPadding || "5px"};
`;

const DropdownToggle = styled.button`
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--primary-200)"};
  color: ${(props) => props.$CustomColor || "var(--botton-2)"};
  padding: ${(props) => props.$CustomPadding || "5px"};
  text-align: ${(props) => props.$CustomTextAlign || "center"};
  border: ${(props) => props.$CustomBorder || "none"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  width: ${(props) => props.$CustomWidth || "125px"};

  &:hover {
    background-color: ${(props) =>
      props.$CustomHoverBackgroundColor || "var(--bg-3)"};
    color: ${(props) => props.$CustomHoverColor || "var(--boton-2)"};
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => props.$CustomDisplay || "flex"};
  flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
  position: ${(props) => props.$CustomPosition || "absolute"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--bg-300)"};
  box-shadow: ${(props) =>
    props.$CustomBoxShadow || "0px 8px 16px var(--shadow-1)"};
  z-index: ${(props) => props.$CustomZIndex || 1};
  padding: ${(props) => props.$CustomPadding || "10% 10% 10% 10%"};
  gap: ${(props) => props.$CustomGap || "5px"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
`;

const DropdownItem = styled.div`
  color: ${(props) => props.$CustomColor || "var(--text-100)"};
  width: ${(props) => props.$CustomWidth || "100%"};

  &:hover {
    color: ${(props) => props.$CustomHoverColor || "white"};
  }
`;

const DropdownDivider = styled.div`
  border-bottom: ${(props) =>
    props.$CustomBorderBottom || "1px solid var(--text-100)"};
  margin: ${(props) => props.$CustomMargin || "0.5rem 0"};
  width: ${(props) => props.$CustomWidth || "130%"};
  margin-left: ${(props) => props.$CustomMarginLeft || "-12px"};
`;

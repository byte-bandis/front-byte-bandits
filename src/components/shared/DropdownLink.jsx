import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./header/header.module.css";
import React from "react";
import styled from "styled-components";

const DropdownLink = ({ children, className, options, ...rest }) => {
  return (
    <StyledDropdownButton title={children} className={className}>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <StyledDropdownItem
            as={option.to ? Link : "button"}
            to={option.to}
            onClick={option.onClick}
            className={styles[option.className]}
            {...rest}
          >
            {option.text}
          </StyledDropdownItem>
          {index < options.length - 1 && (
            <StyledDropdownDivider key={`divider-${index}`} />
          )}
        </React.Fragment>
      ))}
    </StyledDropdownButton>
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

const StyledDropdownButton = styled(DropdownButton).attrs({
  variant: "custom",
})`
  background-color: var(--success-2);
  color: var(--botton-2);
  border-raidus: 5px;

  &:hover,
  &:focus {
    background-color: var(--bg-3);
    color: var(--boton-2);
  }
`;

const StyledDropdownItem = styled(Dropdown.Item).attrs({
  variant: "custom",
})`
  display: flex;
  background-color: var(--advert-1);
  color: var(--text-1);
  padding: 0.5rem 1rem;
  text-align: center;

  &:hover,
  &:focus {
    background-color: var(--success-2);
    color: var(--bg-3);
  }

  &.active {
    background-color: var(--botton-2);
    color: var(--bg-2);
  }
`;

const StyledDropdownDivider = styled(Dropdown.Divider)`
  border-color: var(--border-1);
`;

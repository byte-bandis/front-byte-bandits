import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styles from "./header/header.module.css";
import React from "react";

const DropdownLink = ({ children, className, options, ...rest }) => {
  return (
    <DropdownButton title={children} className={className}>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <Dropdown.Item
            as={option.to ? Link : "button"}
            to={option.to}
            onClick={option.onClick}
            className={styles[option.className]}
            {...rest}
          >
            {option.text}
          </Dropdown.Item>
          {index < options.length - 1 && (
            <Dropdown.Divider key={`divider-${index}`} />
          )}
        </React.Fragment>
      ))}
    </DropdownButton>
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

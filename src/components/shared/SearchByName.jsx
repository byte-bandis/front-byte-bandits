import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const SearchByName = ({
  className,
  children,
  handleFilterAdsByName,
  autoComplete,
  ...rest
}) => {
  return (
    <div>
      <Form.Label htmlFor="name">{children}</Form.Label>
      <Form.Control
        className={className}
        type="text"
        onChange={handleFilterAdsByName}
        autoComplete={autoComplete}
        {...rest}
      />
    </div>
  );
};

SearchByName.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleFilterAdsByName: PropTypes.func,
  autoComplete: PropTypes.string,
};

export default SearchByName;

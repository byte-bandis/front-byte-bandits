import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import styled from "styled-components";

const SearchByName = ({
  className,
  children,
  handleFilterAdsByName,
  autoComplete,
  ...rest
}) => {
  return (
    <Container>
      <Label htmlFor="name">{children}</Label>
      <Input
        className={className}
        type="text"
        onChange={handleFilterAdsByName}
        autoComplete={autoComplete}
        {...rest}
      />
    </Container>
  );
};

SearchByName.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleFilterAdsByName: PropTypes.func,
  autoComplete: PropTypes.string,
};

export default SearchByName;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: var(--advert-1);
  border-radius: 5px;
`;

const Label = styled(Form.Label)`
  color: var(--text-1);
`;

const Input = styled(Form.Control)`
 border: 1px solid var(--border-1);
  border-radius: 5px;
  padding: 8px;
  
  &:focus {
    border-color: var(--border-1);`;

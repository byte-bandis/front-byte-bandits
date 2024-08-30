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
  display: ${(props) => props.$CustomDisplay || "flex"};
  flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
  gap: ${(props) => props.$CustomGap || "10px"};
  padding: ${(props) => props.$CustomPadding || "15px"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
`;

const Label = styled(Form.Label)`
  color: ${(props) => props.$CustomColor || "var(--text-1)"};
`;

const Input = styled(Form.Control)`
  border: ${(props) => props.$CustomBorder || "1px solid var(--border-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  padding: ${(props) => props.$CustomPadding || "8px"};

  &:focus {
    border-color: ${(props) => props.$CustomBorderColor || "var(--border-1)"};
  }
`;

import Form from "react-bootstrap/Form";
import P from "prop-types";
import styled from "styled-components";

const SearchByName = ({ value, onChange, onEnter }) => {
  console.log("onEnter is", onEnter);
  const handleKeyPress = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      onEnter(event);
    } else {
      console.error("onEnter porp is not working");
    }
  };

  return (
    <Container>
      <Input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Enter the product name"
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
};

SearchByName.propTypes = {
  text: P.node.isRequired,
  onChange: P.func,
  value: P.string,
  onEnter: P.func.isRequired,
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

const Input = styled(Form.Control)`
  border: ${(props) => props.$CustomBorder || "1px solid var(--border-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  padding: ${(props) => props.$CustomPadding || "8px"};

  &:focus {
    border-color: ${(props) => props.$CustomBorderColor || "var(--border-1)"};
  }
`;

import P from "prop-types";
import styled from "styled-components";

const SearchByName = ({ value, onChange, onEnter, customWidth }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onEnter(event);
    }
  };

  return (
    <Container>
      <Input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Enter the product name + Enter"
        onKeyPress={handleKeyPress}
        customWidth={customWidth}
      />
    </Container>
  );
};

SearchByName.propTypes = {
  text: P.string,
  onChange: P.func,
  value: P.string,
  onEnter: P.func.isRequired,
  customWidth: P.string,
};

export default SearchByName;

const Container = styled.div`
  display: ${(props) => props.customDisplay || "flex"};
  flex-direction: ${(props) => props.customFlexDirection || "column"};
  gap: ${(props) => props.customGap || "10px"};
  padding: ${(props) => props.customPadding || "15px"};
  background-color: ${(props) =>
    props.customBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.customBorderRadius || "5px"};
`;

const Input = styled.input`
  border: ${(props) => props.customBorder || "1px solid var(--border-1)"};
  border-radius: ${(props) => props.customBorderRadius || "5px"};
  padding: ${(props) => props.customPadding || "8px"};
  width: ${(props) => props.customWidth || "auto"};

  &:focus {
    border-color: ${(props) => props.customBorderColor || "var(--border-1)"};
    outline: none;
  }
`;

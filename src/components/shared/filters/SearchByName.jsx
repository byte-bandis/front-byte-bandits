import P from "prop-types";
import styled from "styled-components";

const SearchByName = ({ value, onChange, onEnter, $CustomWidth, Children }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onEnter(event);
    }
  };

  return (
    <Container
    customFlexDirection="row">
      <Input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Enter the product name + Enter"
        onKeyPress={handleKeyPress}
        $CustomWidth={$CustomWidth}
      />
            {Children}

    </Container>
  );
};

SearchByName.propTypes = {
  text: P.string,
  onChange: P.func,
  value: P.string,
  onEnter: P.func.isRequired,
  $CustomWidth: P.string,
  Children: P.node,
};

export default SearchByName;

const Container = styled.div`
  display: ${(props) => props.customDisplay || "flex"};
  flex-direction: ${(props) => props.customFlexDirection || "column"};
  gap: ${(props) => props.customGap || "10px"};
  padding: ${(props) => props.customPadding || "0"};
  background-color: ${(props) =>
    props.customBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.customBorderRadius || "5px"};

  width: ${(props) => props.$CustomWidth || "100%"};
`;

const Input = styled.input`
  border: ${(props) => props.customBorder || "1px dotted var(--primary-200)"};
  background: ${(props) => props.customBackground || "var(--bg-100)"};
  border-radius: ${(props) => props.customBorderRadius || "5px"};
  padding: ${(props) => props.customPadding || "8px"};
  width: ${(props) => props.$CustomWidth || "auto"};

  &:focus {
    border-color: ${(props) =>
      props.customBorderColor || "3px solid var(--primary-300)"};
    outline: none;
  }
`;

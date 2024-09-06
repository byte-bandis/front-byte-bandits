import P from "prop-types";
import styled from "styled-components";

const TagsOptionsSelector = ({
  text,
  options,
  selectedTags = [],
  handleTagChange,
  type = "checkbox",
  optionType = "object",
}) => {
  return (
    <TagsContainer>
      <Label>{text}</Label>

      <TagColumn>
        {options.map((option) => {
          if (optionType === "object" && option.value !== undefined) {
            const isChecked =
              selectedTags.includes(option.value) ||
              (option.value === null && selectedTags.length === 0);
            return (
              <TagLabel key={option.value || "none"}>
                <TagInput
                  type={type}
                  value={option.value || ""}
                  checked={isChecked}
                  onChange={() => handleTagChange(option.value)}
                  id={option.value || "none"}
                  name={text}
                />
                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
              </TagLabel>
            );
          }
          return null;
        })}
      </TagColumn>
    </TagsContainer>
  );
};

TagsOptionsSelector.propTypes = {
  text: P.string.isRequired,
  options: P.array.isRequired,
  selectedTags: P.array,
  handleTagChange: P.func.isRequired,
  type: P.string,
  optionType: P.string,
};

export default TagsOptionsSelector;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const TagColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagLabel = styled.label`
  margin-bottom: 8px;
`;

const TagInput = styled.input`
  margin-right: 8px;
`;

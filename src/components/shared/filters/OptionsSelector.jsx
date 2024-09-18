import P from "prop-types";
import styled from "styled-components";

const OptionsSelector = ({
  options,
  selectedTags = [],
  handleTagChange,
  type = "checkbox",
  optionType = "object",
}) => {
  return (
    <TagsContainer>
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
                  name={option.Label}
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

OptionsSelector.propTypes = {
  text: P.string.isRequired,
  options: P.array.isRequired,
  selectedTags: P.array,
  handleTagChange: P.func.isRequired,
  type: P.string,
  optionType: P.string,
};

export default OptionsSelector;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-100);
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid var(--primary-200);
  
`;

const TagColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagLabel = styled.label`
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    background-color: var(--primary-200);
  }
  
  
`;

const TagInput = styled.input`
  margin-right: 8px;
  
`;

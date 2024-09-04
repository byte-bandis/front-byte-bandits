import PropTypes from "prop-types";
import styled from "styled-components";
import TAG_OPTIONS from "../../utils/tags";

const TagsOptionsSelector = ({ text, tags, handleTagChange }) => {
  const firstColumn = TAG_OPTIONS.slice(0, 3);
  const secondColumn = TAG_OPTIONS.slice(3);

  return (
    <TagsContainer>
      <Label>{text}</Label>
      <TagColumns>
        <TagColumn>
          {firstColumn.map((tag) => (
            <TagLabel key={tag}>
              <TagInput
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                id={tag}
              />
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </TagLabel>
          ))}
        </TagColumn>
        <TagColumn>
          {secondColumn.map((tag) => (
            <TagLabel key={tag}>
              <TagInput
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                id={tag}
              />
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </TagLabel>
          ))}
        </TagColumn>
      </TagColumns>
    </TagsContainer>
  );
};

TagsOptionsSelector.propTypes = {
  text: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTagChange: PropTypes.func.isRequired,
};

export default TagsOptionsSelector;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagColumns = styled.div`
  display: flex;
  gap: 10px;
`;

const TagColumn = styled.div`
  flex: 1;
  min-width: 150px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const TagLabel = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 5px;
`;

const TagInput = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

import Form from "react-bootstrap/Form";
import TAG_OPTIONS from "../../utils/tags";
import PropTypes from "prop-types";
import styled from "styled-components";

const TagsOptionsSelector = ({ className, tags, handleTagChange }) => {
  const firstColumn = TAG_OPTIONS.slice(0, 3);
  const secondColumn = TAG_OPTIONS.slice(3);

  return (
    <Form.Group className={className}>
      <Form.Label>Tags:</Form.Label>
      <TagsContainer>
        <TagColumn>
          {firstColumn.map((tag) => (
            <Form.Check
              key={tag}
              type="checkbox"
              label={tag.charAt(0).toUpperCase() + tag.slice(1)}
              value={tag}
              checked={tags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              id={tag}
            />
          ))}
        </TagColumn>
        <TagColumn>
          {secondColumn.map((tag) => (
            <Form.Check
              key={tag}
              type="checkbox"
              label={tag.charAt(0).toUpperCase() + tag.slice(1)}
              value={tag}
              checked={tags.includes(tag)}
              onChange={() => handleTagChange(tag)}
              id={tag}
            />
          ))}
        </TagColumn>
      </TagsContainer>
    </Form.Group>
  );
};

TagsOptionsSelector.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTagChange: PropTypes.func.isRequired,
};
export default TagsOptionsSelector;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagColumn = styled.div`
  flex: 1;
  min-width: 150px;
`;

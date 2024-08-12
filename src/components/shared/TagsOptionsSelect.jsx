import Form from "react-bootstrap/Form";
import TAG_OPTIONS from "../../utils/tags";
import PropTypes from "prop-types";

const TagsOptionsSelector = ({ className, selectedTags, handleTagChange }) => {
  return (
    <Form.Group className={className}>
      <Form.Label>Tags</Form.Label>
      <div className="tags-container">
        {TAG_OPTIONS.map((tag) => (
          <Form.Check
            key={tag}
            type="checkbox"
            label={tag.charAt(0).toUpperCase() + tag.slice(1)}
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
            id={tag}
          />
        ))}
      </div>
    </Form.Group>
  );
};

TagsOptionsSelector.propTypes = {
  className: PropTypes.string,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTagChange: PropTypes.func.isRequired,
};
export default TagsOptionsSelector;

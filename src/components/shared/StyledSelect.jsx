import styled from "styled-components";
import P from "prop-types";

function CustomSelect({ text, options, ariaLabel }) {
  return (
    <SelectWrapper>
      {text && <Label htmlFor="custom-select">{text}</Label>}
      <Select id="custom-select" aria-label={ariaLabel}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Arrow>▼</Arrow>
    </SelectWrapper>
  );
}

CustomSelect.propTypes = {
  text: P.string,
  options: P.arrayOf(
    P.shape({
      value: P.string.isRequired,
      label: P.string.isRequired,
    }),
  ),
  ariaLabel: P.string,
};

export default CustomSelect;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${(props) => props.$CustomWidth || "100%"};
`;

const Label = styled.label`
  color: ${(props) => props.$CustomColor || "var(--text-1)"};
  display: block;
  margin-bottom: 4px; /* Añadido para espaciar un poco entre el label y el select */
`;

const Select = styled.select`
  width: ${(props) => props.$CustomWidth || "100%"};
  padding: ${(props) => props.$CustomPadding || "8px 12px"};
  font-size: ${(props) => props.$CustomFontSize || "16px"};
  border: ${(props) => props.$CustomBorder || "1px solid #ced4da"};
  border-radius: ${(props) => props.$CustomBorderRadius || "4px"};
  background-color: ${(props) => props.$CustomBackgroundColor || "#fff"};
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.$CustomFocusBorderColor || "#80bdff"};
    box-shadow: ${(props) =>
      props.$CustomFocusBoxShadow || "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"};
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 70%;
  right: ${(props) => props.$CustomRight || "12px"};
  transform: translateY(-50%);
  pointer-events: none;
  font-size: ${(props) => props.$CustomFontSize || "14px"};
  color: ${(props) => props.$CustomColor || "#495057"};
`;

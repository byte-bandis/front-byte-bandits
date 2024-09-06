import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const PriceRangeSelect = ({ min, max, minValue, maxValue, onPriceChange }) => {
  return (
    <Container>
      <div>
        <Label htmlFor="min-price">Min Price</Label>
        <Input
          id="min-price"
          type="number"
          value={minValue !== undefined ? minValue : ""}
          min={min}
          onChange={(e) => onPriceChange("minPrice", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="max-price">Max Price</Label>
        <Input
          id="max-price"
          type="number"
          value={maxValue !== undefined ? maxValue : ""}
          max={max}
          onChange={(e) => onPriceChange("maxPrice", e.target.value)}
        />
      </div>
    </Container>
  );
};

PriceRangeSelect.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onPriceChange: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default PriceRangeSelect;

const Container = styled.div`
  display: ${(props) => props.$CustomDisplay || "flex"};
  flex-direction: ${(props) => props.$CustomFlexDirection || "column"};
  gap: ${(props) => props.$CustomGap || "10px"};
  padding: ${(props) => props.$CustomPadding || "15px"};
  background-color: ${(props) =>
    props.$CustomBackgroundColor || "var(--advert-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
`;

const Label = styled.div`
  color: ${(props) => props.$CustomColor || "var(--text-1)"};
`;

const Input = styled(Form.Control)`
  border: ${(props) => props.$CustomBorder || "1px solid var(--border-1)"};
  border-radius: ${(props) => props.$CustomBorderRadius || "5px"};
  padding: ${(props) => props.$CustomPadding || "8px"};

  &:focus {
    border-color: ${(props) => props.$CustomBorderColor || "var(--border-1)"};
    box-shadow: ${(props) =>
      props.$CustomBoxShadow || "0 0 0 0.2rem rgba(13,110,253,0.25)"};
  }
`;

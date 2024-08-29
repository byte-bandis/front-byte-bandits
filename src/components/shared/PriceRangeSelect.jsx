import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const PriceRangeSelect = ({
  className,
  min,
  max,
  minValue,
  maxValue,
  onPriceChange,
  ...rest
}) => {
  const [values, setValues] = useState({
    minPrice: minValue || min,
    maxPrice: maxValue !== undefined ? maxValue : max,
  });

  useEffect(() => {
    setValues({
      minPrice: minValue !== undefined ? minValue : min,
      maxPrice: maxValue !== undefined ? maxValue : max,
    });
  }, [minValue, maxValue, min, max]);

  const changeMinPrice = (e) => {
    const newMinPrice = Number(e.target.value);
    setValues((prevValues) => ({ ...prevValues, minPrice: newMinPrice }));
    if (typeof onPriceChange === "function") {
      onPriceChange(newMinPrice, values.maxPrice);
    }
  };

  const changeMaxPrice = (e) => {
    const newMaxPrice = Number(e.target.value);
    setValues((prevValues) => ({ ...prevValues, maxPrice: newMaxPrice }));
    if (typeof onPriceChange === "function") {
      onPriceChange(values.minPrice, newMaxPrice);
    }
  };

  return (
    <Container className={className}>
      <div>
        <Label htmlFor="min-price">Min Price</Label>
        <Input
          id="min-price"
          type="number"
          value={values.minPrice !== undefined ? values.minPrice : ""}
          min={min}
          onChange={changeMinPrice}
          {...rest}
        />
      </div>
      <div>
        <Label htmlFor="max-price">Max Price</Label>
        <Input
          id="max-price"
          type="number"
          value={values.maxPrice !== undefined ? values.maxPrice : ""}
          max={max}
          onChange={changeMaxPrice}
          {...rest}
        />
      </div>
    </Container>
  );
};

PriceRangeSelect.propTypes = {
  className: PropTypes.string,
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

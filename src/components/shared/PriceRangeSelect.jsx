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
        <Label htmlFor={`${className}-min`}>Min Price</Label>
        <Input
          id={`${className}-min`}
          type="number"
          value={values.minPrice !== undefined ? values.minPrice : ""}
          min={min}
          onChange={changeMinPrice}
          minValue={values.minPrice}
          {...rest}
        />
      </div>
      <div>
        <Label htmlFor={`${className}-max`}>Max Price</Label>
        <Input
          id={`${className}-max`}
          type="number"
          value={values.maxPrice !== undefined ? values.maxPrice : ""}
          max={max}
          onChange={changeMaxPrice}
          maxValue={values.maxPrice}
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: var(--advert-1);
  border-radius: 5px;
`;

const Label = styled.div`
  color: var(--text-1);
`;

const Input = styled(Form.Control)`
border: 1px solid var(--border-1);
border-radius: 5px;
padding: 8px
&:focus{
border-color: var(--border-1);
box-shadow: 0 0 0 0.2rem rgba(13,110,253,0.25)}

`;

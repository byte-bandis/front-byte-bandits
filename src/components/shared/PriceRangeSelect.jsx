import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
    <div>
      <div>
        Min Price:
        <Form.Control
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
        Max price:
        <Form.Control
          id={`${className}-max`}
          type="number"
          value={values.maxPrice !== undefined ? values.maxPrice : ""}
          max={max}
          onChange={changeMaxPrice}
          maxValue={values.maxPrice}
          {...rest}
        />
      </div>
    </div>
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

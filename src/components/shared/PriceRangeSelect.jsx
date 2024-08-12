import { Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const PriceRangeSelect = ({ className, min, max, onPriceChange, ...rest }) => {
  const [values, setValues] = useState({
    minPrice: min,
    maxPrice: max,
  });

  const changeMinPrice = (e) => {
    const newMinPrice = Number(e.target.value);
    if (typeof onPriceChange === "function") {
      setValues((prevValues) => ({ ...prevValues, minPrice: newMinPrice }));
      onPriceChange(newMinPrice, values.maxPrice);
    }
  };

  const changeMaxPrice = (e) => {
    const newMaxPrice = Number(e.target.value);
    if (typeof onPriceChange === "function") {
      setValues((prevValues) => ({ ...prevValues, maxPrice: newMaxPrice }));
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
          value={values.minPrice || ""}
          min={min}
          onChange={changeMinPrice}
          {...rest}
        />
      </div>
      <div>
        Max price:
        <Form.Control
          id={`${className}-max`}
          type="number"
          value={values.maxPrice || ""}
          max={max}
          onChange={changeMaxPrice}
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
};

export default PriceRangeSelect;

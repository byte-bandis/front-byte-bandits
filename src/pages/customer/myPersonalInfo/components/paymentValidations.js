export const validate = ({ creditCard }) => {
  const newErrors = {};

  if (creditCard !== "----") {
    if (creditCard.length < 13 || creditCard.length > 18) {
      newErrors.creditCard = "Credit card number must be 13 to 18 digits";
    }
  }

  if (creditCard !== "----") {
    if (!/^\d*$/.test(creditCard)) {
      newErrors.creditCard = "Credit card number must contain only digits";
    }
  }

  return newErrors;
};

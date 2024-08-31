export const validate = ({ creditCard }) => {
  const newErrors = {};

  if (creditCard !== "card") {
    if (creditCard.length < 13 || creditCard.length > 18) {
      newErrors.creditCard = "Credit card number must be 13 to 18 digits";
    }
  }
  console.log("Esto es creditCard: ", creditCard);
  if (creditCard !== "card") {
    if (!/^\d*$/.test(creditCard)) {
      newErrors.creditCard = "Credit card number must contain only digits";
    }
  }

  return newErrors;
};

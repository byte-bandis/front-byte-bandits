export const validate = (t, { creditCard }) => {
  const newErrors = {};

  if (creditCard !== "----") {
    if (creditCard.length < 13 || creditCard.length > 18) {
      newErrors.creditCard = t("credit_card_length_invalid");
    }
  }

  if (creditCard !== "----") {
    if (!/^\d*$/.test(creditCard)) {
      newErrors.creditCard = t("credit_card_digits_only");
    }
  }

  return newErrors;
};

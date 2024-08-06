export const validate = ({ password, passwordConfirmation, birthdate }) => {
  const newErrors = {};
  const userAge = () => {
    const userBirthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - userBirthDate.getFullYear();
    const monthDifference = today.getMonth() - userBirthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < userBirthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (password.length < 6) {
    newErrors.password = "Password length requires at least 6 characters";
  }
  if (password !== passwordConfirmation) {
    newErrors.password = "Passwords are different";
  }
  if (userAge() < 18 || userAge() > 120) {
    newErrors.birthdate = "User need to be at least 18 years old";
  }
  return newErrors;
};

export const checkAllFieldsFilled = (formValues) => {
  const areAllFieldsFilled = Object.values(formValues).every(
    (value) => value !== "" && value !== false,
  );
  return areAllFieldsFilled;
};

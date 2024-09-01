export const validate = ({
  email,
  name,
  username,
  lastname,
  birthdate,
  mobilePhoneNumber,
}) => {
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

  if (name && name.length > 15) {
    newErrors.name = "Name can only contain up to 15 characters";
  }
  if (lastname && lastname.length > 15) {
    newErrors.lastname = "Last name can only contain up to 15 characters";
  }
  if (!username) {
    newErrors.username = "Nick name cannot be empty";
  }
  if (!email) {
    newErrors.email = "Email cannot be empty";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    newErrors.email = "Email format is invalid";
  }

  const userAgeValue = userAge();
  if (userAgeValue < 18 || userAgeValue > 120) {
    newErrors.birthdate = "User needs to be between 18 and 120 years old.";
  }

  if (
    mobilePhoneNumber &&
    mobilePhoneNumber !== "--- --- ---" &&
    !/^\d{3}\s\d{3}\s\d{3}$/.test(mobilePhoneNumber)
  ) {
    console.log("Esto es mobilePhoneNumber en validators: ", mobilePhoneNumber);
    newErrors.mobilePhoneNumber =
      "Phone number should be formatted as 111 111 111 or left empty";
  }

  return newErrors;
};

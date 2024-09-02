export const validate = (
  t,
  { email, name, username, lastname, birthdate, mobilePhoneNumber }
) => {
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
    newErrors.name = t("name_length");
  }
  if (lastname && lastname.length > 15) {
    newErrors.lastname = t("lastname_length");
  }
  if (!username) {
    newErrors.username = t("username_empty");
  }
  if (!email) {
    newErrors.email = t("email_empty");
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    newErrors.email = t("email_format_invalid");
  }

  const userAgeValue = userAge();
  if (userAgeValue < 18 || userAgeValue > 120) {
    newErrors.birthdate = t("user_age_invalid");
  }

  if (
    mobilePhoneNumber &&
    mobilePhoneNumber !== "--- --- ---" &&
    !/^\d{3}\s\d{3}\s\d{3}$/.test(mobilePhoneNumber)
  ) {
    newErrors.mobilePhoneNumber = t("phone_number_format_invalid");
  }

  return newErrors;
};

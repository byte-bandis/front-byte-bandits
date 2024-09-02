import countriesDB from "../../../../utils/countriesDB.json";

export const validate = (
  t,
  { country, streetName, streetNumber, flat, door, postalCode, city }
) => {
  const newErrors = {};
  const countryNames = countriesDB.map((c) => c.name);

  if (country && !countryNames.includes(country)) {
    newErrors.country = t("country_not_recognized", { country });
  }

  if (streetName && streetName.length > 60) {
    newErrors.streetName = t("street_name_length");
  }

  if (streetNumber && streetNumber.length > 5) {
    newErrors.streetNumber = t("street_number_length");
  }

  if (flat && flat.length > 5) {
    newErrors.flat = t("flat_length");
  }

  if (door && door.length > 5) {
    newErrors.door = t("door_length");
  }

  if (postalCode && postalCode.length > 15) {
    newErrors.postalCode = t("postal_code_length");
  }

  if (city && city.length > 30) {
    newErrors.city = t("city_length");
  }

  return newErrors;
};

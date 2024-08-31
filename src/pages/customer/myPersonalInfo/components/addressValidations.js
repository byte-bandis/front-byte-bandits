import countriesDB from "../../../../utils/countriesDB.json";

export const validate = ({
  country,
  streetName,
  streetNumber,
  flat,
  door,
  postalCode,
  city,
}) => {
  const newErrors = {};
  const countryNames = countriesDB.map((c) => c.name);

  if (country && !countryNames.includes(country)) {
    newErrors.country = `Country ${country} not recognized`;
  }

  if (streetName && streetName.length > 60) {
    newErrors.streetName = "Street name can only contain up to 60 characters";
  }

  if (streetNumber && streetNumber.length > 5) {
    newErrors.streetNumber =
      "Stret number can only contain up to 10 characters";
  }

  if (flat && flat.length > 5) {
    newErrors.flat = "Flat can only contain up to 10 characters";
  }

  if (door && door.length > 5) {
    newErrors.door = "Door can only contain up to 10 characters";
  }

  if (postalCode && postalCode.length > 15) {
    newErrors.postalCode = "Zip code can only contain up to 15 characters";
  }

  if (city && city.length > 30) {
    newErrors.city = "You can only write up to 30 characters";
  }

  return newErrors;
};

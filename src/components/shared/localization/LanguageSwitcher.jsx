import i18n from "i18next";
import PropTypes from "prop-types";
import { RegularButton } from "../buttons";
import { ButtonContainer } from "../buttons";
import FlagSelector from "./FlagSelector";

const LanguageSwitcher = ({ flag }) => {
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonContainer $gap="5%">
      <RegularButton
        onClick={() => handleLanguageChange("en")}
        $customBackground="transparent"
        $customBorder="none"
        $customHoverBackgroundColor="none"
        $customHoverColor="var(--accent-200)"
        $customPadding="0"
      >
        {flag ? (
          <FlagSelector
            countryCode="GB"
            customWidth={"30px"}
            customHeight={"18px"}
          />
        ) : (
          "EN"
        )}
      </RegularButton>
      <RegularButton
        onClick={() => handleLanguageChange("es")}
        $customBackground="transparent"
        $customBorder="none"
        $customHoverBackgroundColor="none"
        $customHoverColor="var(--accent-200)"
        $customVerticalPadding="0"
      >
        {flag ? (
          <FlagSelector
            countryCode="ES"
            customWidth={"30px"}
            customHeight={"18px"}
          />
        ) : (
          "ES"
        )}
      </RegularButton>
    </ButtonContainer>
  );
};
LanguageSwitcher.propTypes = {
  flag: PropTypes.string,
};

export default LanguageSwitcher;

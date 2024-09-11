import i18n from "i18next";
import PropTypes from "prop-types";
import { RegularButton } from "../buttons";
import { ButtonContainer } from "../buttons";
import FlagSelector from "./FlagSelector";
import Cookies from "js-cookie";

const LanguageSwitcher = ({ flag, ...props }) => {
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    Cookies.set("formatLanguage", lng, 365);
  };

  return (
    <ButtonContainer
      {...props}
      $widthContainer="auto"
    >
      <RegularButton
        onClick={() => handleLanguageChange("en")}
        $customBackground="transparent"
        $customBorder="none"
        $customHoverBackgroundColor="none"
        $customHoverColor="var(--accent-200)"
        $customFocusBackground="transparent"
        $customActiveBackground="transparent"
        $customPadding="0"
        {...props}
      >
        {flag ? (
          <FlagSelector
            onClick={() => handleLanguageChange("en")}
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
        $customFocusBackground="transparent"
        $customActiveBackground="transparent"
        $customVerticalPadding="0"
        {...props}
      >
        {flag ? (
          <FlagSelector
            onClick={() => handleLanguageChange("en")}
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
  flag: PropTypes.bool,
};

export default LanguageSwitcher;

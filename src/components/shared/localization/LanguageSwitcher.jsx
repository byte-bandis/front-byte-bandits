import { setCookie } from "../../../lib/setCookies";
import i18n from "i18next";
import PropTypes from "prop-types";
import { RegularButton } from "../buttons";
import { ButtonContainer } from "../buttons";
import FlagSelector from "./FlagSelector";

const LanguageSwitcher = ({ flag, ...props }) => {
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setCookie("formatLanguage", lng, 365);
  };

  return (
    <ButtonContainer {...props}>
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

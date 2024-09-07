import "./Footer.css";
import { useTranslation } from "react-i18next";
import StyledContainer from "./StyledContainer";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <StyledContainer
        $customDisplay="flex"
        $customFlexDirection="row"
      >
        <StyledContainer
          $customDisplay="flex"
          $customJustifyContent="center"
          $customWidth="20%"
        >
          <Logo
            $CustomWidth="100%"
            $customImageWidth="70%"
            $customImageHeight="70%"
            $dark
          />
        </StyledContainer>
        <StyledContainer className="footer-container">
          <p>&copy; 2024 Byte Bandits. {t("footer.rightsReserved")}</p>
          <ul className="footer-links">
            <li>
              <a href="/about">{t("footer.aboutUs")}</a>
            </li>
            <li>
              <a href="/contact">{t("footer.contact")}</a>
            </li>
            <li>
              <a href="/privacy">{t("footer.privacyPolicy")}</a>
            </li>
            <li>
              <a href="/terms">{t("footer.termsOfService")}</a>
            </li>
          </ul>
          <div className="social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.social.twitter")}
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.social.facebook")}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.social.instagram")}
            </a>
          </div>
        </StyledContainer>
      </StyledContainer>
    </footer>
  );
};

export default Footer;

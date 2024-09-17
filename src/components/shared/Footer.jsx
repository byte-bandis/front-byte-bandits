import "./Footer.css";
import { useTranslation } from "react-i18next";
import StyledContainer from "./StyledContainer";
import Logo from "./Logo";
import Confirmator from "./Confirmator";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetLoggedUserInfo } from "../../store/authSlice";
import { logout } from "../../pages/auth/service";
import { resetSinglePublicProfile } from "../../store/singlePublicProfileSlice";
import { resetUI } from "../../store/uiSlice";
import ButtonsComponent from "./ButtonsComponent";
import { Facebook, Instagram, TwitterX } from "react-bootstrap-icons";

const Footer = () => {
  const [showConfirmator, setShowConfirmator] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleLogout = () => {
    logout();
    navigate("/");
    dispatch(resetLoggedUserInfo());
    dispatch(resetSinglePublicProfile());
    dispatch(resetUI());
  };

  return (
    <>
      <ButtonsComponent
        ClassName="buttonsContinerMobile"
        navigate={navigate}
        setShowConfirmator={setShowConfirmator}
      />
      <footer className="footer">
        {showConfirmator && (
          <Confirmator
            textValue={t("confirm_logout")}
            onConfirm={handleLogout}
            sethiden={() => setShowConfirmator(false)}
            hidden={showConfirmator}
            $blurerBackgroundColor="var(--primary-200)"
            $blurerHeight="150%"
            $customBorder="1px solid var(--primary-300)"
            $customBackground="var(--bg-100)"
          />
        )}

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
          <StyledContainer
            className="footer-container"
            $customTextAlign="center"
          >
            <p>&copy; 2024 Byte Bandits. {t("footer.rightsReserved")}</p>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy">{t("footer.privacyPolicy")}</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
            <div className="social-icons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterX fontSize={30} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook fontSize={30} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram fontSize={30} />
              </a>
            </div>
          </StyledContainer>
        </StyledContainer>
      </footer>
    </>
  );
};

export default Footer;

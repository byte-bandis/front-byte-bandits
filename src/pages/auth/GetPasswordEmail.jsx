import { useEffect, useState } from "react";
import { loginWithThunk as requestForgottenPassword } from "../../store/loginThunk";
import "./login.css";
import CustomAlert from "../../components/shared/Alert";
import { RegularButton } from "../../components/shared/buttons";
import Logo from "../../components/shared/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getError, getUIMessage } from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";
import StyledContainer from "../../components/shared/StyledContainer";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const toLogin = "/login";
  const isError = useSelector(getError);
  const message = useSelector(getUIMessage);
  const [inputEmail, setInputEmail] = useState("");
  const [show, setShow] = useState(false);
  const resetForm = () => {
    setInputEmail("");
  };

  useEffect(() => {
    if (isError) {
      setShow(true);
    }
  }, [isError]);

  const handleToLogin = () => {
    navigate(toLogin, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      requestForgottenPassword({
        email: inputEmail,
      })
    );
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetUI());
    setShow(false);
  };
  const handlePassword = () => {};

  return (
    <div className={"sign-in__wrapper"}>
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <form
        className="sign-in__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Header */}
        <StyledContainer $customDisplay="flex">
          <Logo $CustomWidth="30%" />
          <StyledContainer
            $customDisplay="flex"
            $customJustifyContent="center"
            $customMargin="1rem"
          >
            <h4>{t("login.sign_in")}</h4>
          </StyledContainer>
        </StyledContainer>
        {/* Alert */}
        {show && (
          <CustomAlert
            variant="error"
            onClose={handleCloseErrorAlert}
            dismissible
            $customWidth="100%"
          >
            {message}
          </CustomAlert>
        )}
        <StyledContainer
          $customMargin
          className="form-group"
        >
          <label htmlFor="email">{t("login.email")}</label>
          <input
            type="text"
            id="email"
            value={inputEmail}
            placeholder={t("login.email_placeholder")}
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </StyledContainer>
        <StyledContainer className="form-group">
          <label htmlFor="password">{t("login.password")}</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            placeholder={t("login.password_placeholder")}
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </StyledContainer>
        <StyledContainer
          $customDisplay="flex"
          $customFlexDirection="row"
          $customJustifyContent="flex-start"
          $customGap="2%"
          $customMargin="1rem 0 0 0"
        >
          <input
            type="checkbox"
            checked={checkboxStatus}
            onChange={handleCheckboxChange}
          />
          <label>{t("login.remember_me")}</label>
        </StyledContainer>
        <RegularButton
          $customMargin="2rem 0 2rem 0"
          $customwidth="100%"
          $variant="attention"
          type="submit"
          disabled={isLogged.loading}
        >
          {isLogged.loading ? t("login.loggingIn") : t("login.logIn")}
        </RegularButton>
        <StyledContainer
          className="form-links"
          $customDisplay="flex"
          $customFlexDirection="row"
          $customWidth="100%"
          $customJustifyContent="space-between"
        >
          <button
            className="form-link"
            onClick={handleToLogin}
          >
            {t("login.register_new_user")}
          </button>
          <button
            className="form-link"
            onClick={handlePassword}
          >
            {t("login.forgot_password")}
          </button>
        </StyledContainer>
      </form>
    </div>
  );
};

export default LoginPage;

import { useEffect, useState } from "react";
import { loginWithThunk } from "../../store/loginThunk";
import "./login.css";
import CustomAlert from "../../components/shared/Alert";
import { RegularButton } from "../../components/shared/buttons";
import Logo from "../../components/shared/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getError,
  getIsLogged,
  getLoading,
  getLoggedUser,
  getLoggedUserName,
  getUIMessage,
} from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";
import StyledContainer from "../../components/shared/StyledContainer";
import { useTranslation } from "react-i18next";
import IconWrapper from "../../components/shared/iconsComponents/IconWrapper";
import { XCircle } from "react-bootstrap-icons";
import CustomPulseLoader from "../../components/shared/spinners/CustomPulseLoader";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const toRegister = "/register";
  const isError = useSelector(getError);
  const isLogged = useSelector(getIsLogged);
  const isLoading = useSelector(getLoading);
  const loggedUserName = useSelector(getLoggedUserName);
  const message = useSelector(getUIMessage);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [show, setShow] = useState(false);
  const resetForm = () => {
    setInputEmail("");
    setInputPassword("");
    setCheckboxStatus(false);
  };
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    if (isError) {
      setShow(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isLogged.authState) {
      resetForm();
      setShow(false);
      const safeFrom = typeof from === "string" ? from : "/";

      if (safeFrom.startsWith("/new") && loggedUserName) {
        const redirectToNew = `/${loggedUserName}/new`;
        navigate(redirectToNew, {
          replace: true,
          state: { from: redirectToNew },
        });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [
    isLogged.authState,
    loggedUser,
    dispatch,
    navigate,
    from,
    loggedUserName,
  ]);

  const handleToRegister = () => {
    navigate(toRegister, { replace: true });
  };

  const handleToFrom = () => {
    navigate(from, { replace: true });
  };

  const handleCheckboxChange = (event) => {
    setCheckboxStatus(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(resetUI());
    await dispatch(
      loginWithThunk({
        email: inputEmail,
        password: inputPassword,
        requestStorage: checkboxStatus,
      })
    );
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetUI());
    setShow(false);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    navigate("/password-reminder");
  };

  return (
    <div className={`sign-in__wrapper ${isLogged.authState ? "hidden" : ""}`}>
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
          <IconWrapper
            IconComponent={XCircle}
            size="30px"
            top="1%"
            right="-5%"
            onClick={handleToFrom}
            cursor="pointer"
          />
        </StyledContainer>
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

        {!isLoading ? (
          <>
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
              $customVerticalPadding=".6rem"
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
                onClick={handleToRegister}
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
          </>
        ) : (
          <CustomPulseLoader />
        )}
      </form>
    </div>
  );
};

export default LoginPage;

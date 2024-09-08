import { useEffect, useState } from "react";
import { loginWithThunk as sendNewPassword } from "../../store/loginThunk";
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

const RestorePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const toLogin = "/login";
  const isError = useSelector(getError);
  const message = useSelector(getUIMessage);
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const resetForm = () => {
    setInputNewPassword("");
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
      sendNewPassword({
        password: inputNewPassword,
        confirmPassword: inputConfirmPassword,
      })
    );
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetUI());
    setShow(false);
  };

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
            <h4>{t("login.restore_password_title")}</h4>
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
          className="info"
          $customDisplay="flex"
          $customFlexDirection="row"
          $customJustifyContent="flex-start"
          $customGap="2%"
          $customMargin="1rem 0 0 0"
        >
          <p>{t("login.info_insert_new_password")}</p>
        </StyledContainer>

        <StyledContainer
          $customMargin
          className="form-group"
        >
          <label htmlFor="password">{t("login.insert_new_password")}</label>
          <input
            type="password"
            id="password"
            value={inputNewPassword}
            onChange={(e) => setInputNewPassword(e.target.value)}
            placeholder={t("login.write_new_password")}
            required
          />
        </StyledContainer>
        <StyledContainer
          $customMargin
          className="form-group"
        >
          <label htmlFor="confirmPassword">
            {t("login.confirm_new_password")}
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={inputConfirmPassword}
            onChange={(e) => setInputConfirmPassword(e.target.value)}
            placeholder={t("login.write_confirm_new_password")}
            required
          />
        </StyledContainer>

        <RegularButton
          $customMargin="2rem 0 2rem 0"
          $customwidth="100%"
          $variant="attention"
          $customVerticalPadding=".6rem"
          type="submit"
        >
          {t("send")}
        </RegularButton>
      </form>
    </div>
  );
};

export default RestorePassword;

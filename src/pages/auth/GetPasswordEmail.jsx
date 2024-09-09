import { useEffect, useState } from "react";
import "./login.css";
import CustomAlert from "../../components/shared/Alert";
import { RegularButton } from "../../components/shared/buttons";
import Logo from "../../components/shared/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getError, getUIMessage } from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";
import StyledContainer from "../../components/shared/StyledContainer";
import { useTranslation } from "react-i18next";
import { validateEmailForRestorePasswordThunk } from "../../store/MyPersonalData/myPasswordThunk";
import IconWrapper from "../../components/shared/iconsComponents/IconWrapper";
import { XCircle } from "react-bootstrap-icons";

const SetRestorePasswordEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toLogin = "/login";
  const isError = useSelector(getError);
  const message = useSelector(getUIMessage);
  const [inputEmail, setInputEmail] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setInputEmail("");
  };

  useEffect(() => {
    if (isError) {
      setShow(true);
      setShowSuccess(false);
    }
  }, [isError]);

  useEffect(() => {
    if (showSuccess) {
      setShow(false);
    }
  }, [showSuccess]);

  const handleToLogin = () => {
    resetForm();
    dispatch(resetUI());
    navigate(toLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      validateEmailForRestorePasswordThunk({
        email: inputEmail,
        type: "resetPassword",
      })
    );
    setShowSuccess(true);
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
          <IconWrapper
            IconComponent={XCircle}
            size="30px"
            top="1%"
            right="-5%"
            onClick={handleToLogin}
            cursor="pointer"
          />
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
            $customWidth="100%"
          >
            {message}
          </CustomAlert>
        )}
        {showSuccess && (
          <>
            <StyledContainer
              className="info"
              $customDisplay="flex"
              $customFlexDirection="row"
              $customJustifyContent="flex-start"
              $customGap="2%"
              $customMargin="1rem 0 0 0"
            >
              <p>{t("login.succes_sending_email_to_restore_password")}</p>
            </StyledContainer>
            <RegularButton
              $customMargin="2rem 0 2rem 0"
              $customwidth="100%"
              $variant="attention"
              $customVerticalPadding=".6rem"
              onClick={handleToLogin}
            >
              {t("login.back_to_login")}
            </RegularButton>
          </>
        )}
        {!showSuccess && (
          <>
            <StyledContainer
              className="info"
              $customDisplay="flex"
              $customFlexDirection="row"
              $customJustifyContent="flex-start"
              $customGap="2%"
              $customMargin="1rem 0 0 0"
            >
              <p>{t("login.insert_email_for_password_reminder")}</p>
            </StyledContainer>

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

            <RegularButton
              $customMargin="2rem 0 2rem 0"
              $customwidth="100%"
              $variant="attention"
              $customVerticalPadding=".6rem"
              type="submit"
            >
              {t("send")}
            </RegularButton>
          </>
        )}
      </form>
    </div>
  );
};

export default SetRestorePasswordEmail;

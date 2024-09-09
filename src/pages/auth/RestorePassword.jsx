import { useEffect, useState } from "react";
import "./login.css";
import CustomAlert from "../../components/shared/Alert";
import { RegularButton } from "../../components/shared/buttons";
import Logo from "../../components/shared/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getError, getSuccess } from "../../store/selectors";
import { resetUI } from "../../store/uiSlice";
import StyledContainer from "../../components/shared/StyledContainer";
import { useTranslation } from "react-i18next";
import IconWrapper from "../../components/shared/iconsComponents/IconWrapper";
import { XCircle } from "react-bootstrap-icons";
import { sendMyRestoredPasswordThunk } from "../../store/MyPersonalData/myPasswordThunk";

const RestorePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toLogin = "/login";
  const isError = useSelector(getError);
  const isSuccess = useSelector(getSuccess);
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      newPassword: inputNewPassword,
      confirmPassword: inputConfirmPassword,
    });
  }, [inputNewPassword, inputConfirmPassword]);

  const { token } = useParams();
  const resetForm = () => {
    setInputNewPassword("");
    setInputConfirmPassword("");
  };

  useEffect(() => {
    if (isError) {
      setShowError(true);
      setShowSuccess(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setShowError(false);
      const timer = setTimeout(() => {
        navigate(toLogin);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleToLogin = () => {
    resetForm();
    dispatch(resetUI());
    navigate(toLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(resetUI());
    dispatch(sendMyRestoredPasswordThunk({ token, formData }));
    resetForm();
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetUI());
    setShowError(false);
  };
  const handleCloseSuccessAlert = () => {
    dispatch(resetUI());
    setShowSuccess(false);
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
        {showError && (
          <CustomAlert
            variant="error"
            onClose={handleCloseErrorAlert}
            $customWidth="100%"
          >
            {isError}
          </CustomAlert>
        )}

        {showSuccess && (
          <CustomAlert
            variant="success"
            onClose={handleCloseSuccessAlert}
            $customWidth="100%"
          >
            {isSuccess}
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
          <label htmlFor="newPassword">{t("login.insert_new_password")}</label>
          <input
            type="password"
            id="newPassword"
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

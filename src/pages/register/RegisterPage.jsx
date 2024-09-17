import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setValidations,
  registerAsync,
  resetForm,
  resetValidationErrors,
} from "../../store/registerSlice";
import "../auth/login.css";
import { useNavigate } from "react-router-dom";
import { checkAllFieldsFilled, validate } from "../../utils/formValidations";
import Logo from "../../components/shared/Logo";
import { setMessage, resetMessage } from "../../store/uiSlice";
import { getUIMessage, getUIState } from "../../store/selectors";
import { getIsLogged } from "../../store/selectors";
import { loginWithThunk } from "../../store/loginThunk";
import CustomForm from "../../components/shared/Form";
import CustomAlert from "../../components/shared/Alert";
import styled from "styled-components";
import StyledContainer from "../../components/shared/StyledContainer";
import "./RegisterPage.css";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    birthdate: "",
    acceptTerms: false,
  });

  const uiMessage = useSelector(getUIMessage);
  const uiMessageArray = uiMessage
    ? uiMessage.split(".").filter((str) => str.trim() !== "")
    : [];
  const uiState = useSelector(getUIState);
  const isLogged = useSelector(getIsLogged);
  const { loading } = useSelector((state) => state.register);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [rememberMe, setRememberMeStatus] = useState(false);

  const handleRememberMeStatus = (event) => {
    setRememberMeStatus(event.target.checked);
  };

  useEffect(() => {
    if (isLogged.authState) {
      navigate("/", { replace: true });
    }
  }, [isLogged.authState, navigate]);

  useEffect(() => {
    setDisableSubmit(!checkAllFieldsFilled(formData));
  }, [formData]);

  const {
    username,
    email,
    password,
    passwordConfirmation,
    birthdate,
    acceptTerms,
  } = formData;

  useEffect(() => {
    if (uiState === "success" && email && password) {
      const timer = setTimeout(() => {
        dispatch(
          loginWithThunk({
            email,
            password,
            requestStorage: rememberMe,
          })
        );
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [uiState, dispatch, email, password, rememberMe, navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    dispatch(resetMessage());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (disableSubmit) return;

    const errors = validate({
      password,
      passwordConfirmation,
      birthdate,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    await dispatch(registerAsync(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetForm());
      dispatch(resetMessage());
      dispatch(resetValidationErrors());
    };
  }, [dispatch]);

  const buttonStyles = {
    $customBackground: "var(--accent-100)",
    $customColor: "var(--text-100)",
    $customHoverBackgroundColor: "var(--accent-200)",
    $customDisabledColor: "gray",
    $customDisableBackGroundColor: "lightgray",
    $customVerticalPadding: "5px 15px",
  };

  return (
    <Register className="RegisterForm">
      <CustomForm
        className="registerForm"
        onSubmit={handleSubmit}
        submitButtonText={t("Register")}
        isLoading={loading}
        disableSubmit={disableSubmit}
        buttonStyles={buttonStyles}
        $alertMessage={uiMessage}
        $alertVariant={uiState === "error" ? "error" : "success"}
        $onAlertClose={() => {
          dispatch(resetMessage());
          dispatch(resetValidationErrors());
        }}
        $CustomBorderRadius="15px"
        $CustomMarginTop="40px"
        $CustomMarginBottom="20px"
        $CustomFontSize="0.8rem"
        $CustomPadding="20px 10px"
      >
        <Logo />

        <h4 className="register">{t("Register")} </h4>
        {uiMessageArray.length > 0 && (
          <CustomAlert
            variant={uiState === "error" ? "error" : "success"}
            onClose={() => {
              dispatch(resetMessage());
              dispatch(resetValidationErrors());
            }}
          >
            {uiMessageArray}
          </CustomAlert>
        )}

        <FormContainer>
          <StyledContainer
            $customDisplay="flex"
            $customAlignItems="start"
            $customMargin="1rem"
            $customGap="0px"
          >
            <StyledLabel htmlFor="username">{t("Username")}:</StyledLabel>
            <StyledInput
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChange}
              placeholder={t("Username")}
              required
            />
          </StyledContainer>
          <StyledContainer
            $customDisplay="flex"
            $customAlignItems="start"
            $customMargin="1rem"
          >
            <StyledLabel htmlFor="email">{t("Email")}:</StyledLabel>
            <StyledInput
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder={t("Email")}
              required
            />
          </StyledContainer>
          <StyledContainer
            $customDisplay="flex"
            $customAlignItems="start"
            $customMargin="1rem"
          >
            <StyledLabel htmlFor="password">{t("Password")}:</StyledLabel>
            <StyledInput
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder={t("Password")}
              required
            />
          </StyledContainer>

          <StyledContainer
            $customDisplay="flex"
            $customAlignItems="start"
            $customMargin="1rem"
          >
            <StyledLabel htmlFor="passwordConfirmation">
              {t("Repeat Password")}:
            </StyledLabel>
            <StyledInput
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChange}
              placeholder={t("Repeat Password")}
              required
            />
          </StyledContainer>

          <StyledContainer
            $customDisplay="flex"
            $customAlignItems="start"
            $customMargin="1rem"
          >
            <StyledLabel htmlFor="birthdate">{t("Birthdate:")}</StyledLabel>
            <StyledInput
              type="date"
              name="birthdate"
              id="birthdate"
              value={birthdate}
              onChange={handleChange}
              required
            />
          </StyledContainer>
          <CheckedContainers>
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="acceptTerms">
              {t("By creating an account, you agree to our")}&nbsp;
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("terms and conditions")};
              </a>
              . {t("Read our")}&nbsp;
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("privacy and cookies policy")}&nbsp;
              </a>
              {t("to find out how we collect and use your personal data.")}
            </label>
          </CheckedContainers>

          <CheckedContainers>
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeStatus}
            />
            <label htmlFor="rememberMe">{t("Remember me")}</label>
          </CheckedContainers>
        </FormContainer>
      </CustomForm>
    </Register>
  );
};

export default RegisterPage;

const Register = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-200);
  color: var(--primary-300);
  .button {
    margin: 0 100px;
  }
`;

const FormContainer = styled.div`
  width: 500px;
  margin: 0rem 2rem;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const CheckedContainers = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledLabel = styled.label`
  border-radius: 4px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 0.5rem;
  border: 1px dotted var(--primary-300);
  border-radius: 4px;
`;

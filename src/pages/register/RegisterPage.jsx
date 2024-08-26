import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setValidations,
  registerAsync,
  resetForm,
} from "../../store/registerSlice";
import "../auth/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { checkAllFieldsFilled, validate } from "../../utils/formValidations";
import Logo from "../../components/shared/Logo";
import { setMessage, resetMessage } from "../../store/uiSlice";
import { getUIMessage, getUIState } from "../../store/selectors";
import { getIsLogged } from "../../store/selectors";
import { loginWithThunk } from "../../store/loginThunk";
import CustomForm from "../../components/shared/Form";
import CustomAlert from "../../components/shared/Alert";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    birthdate: "",
    acceptTerms: false,
  });

  const uiMessage = useSelector(getUIMessage);
  const uiState = useSelector(getUIState);
  const isLogged = useSelector(getIsLogged);
  const { loading, validationErrors } = useSelector((state) => state.register);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [rememberMe, setRememberMeStatus] = useState(false);

  const to = import.meta.env.VITE_LOGIN_REDIRECT_URI;

  const handleRememberMeStatus = (event) => {
    setRememberMeStatus(event.target.checked);
  };

  useEffect(() => {
    if (isLogged.authState) {
      navigate(to, { replace: true });
    }
  }, [isLogged.authState, to, navigate]);

  // useEffect(() => {
  //   checkAllFieldsFilled({
  //     formData,
  //   });
  // }, [formData]);

  useEffect(() => {
    setDisableSubmit(!checkAllFieldsFilled(formData));
  }, [formData]);

  useEffect(() => {
    const isFormValid =
      checkAllFieldsFilled(formData) &&
      Object.keys(validationErrors).length === 0;
    setDisableSubmit(!isFormValid);
  }, [formData, validationErrors]);

  const {
    username,
    email,
    password,
    passwordConfirmation,
    birthdate,
    acceptTerms,
  } = formData;

  useEffect(() => {
    if (uiState === "success") {
      const timer = setTimeout(() => {
        dispatch(
          loginWithThunk({
            email,
            password,
            requestStorage: rememberMe,
          }),
        );
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [uiState, dispatch, email, password, rememberMe, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
      dispatch(resetMessage());
    };
  }, [dispatch]);

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

    const errors = validate({
      email,
      password,
      passwordConfirmation,
      birthdate,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).legnth > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    const resultAction = await dispatch(registerAsync(formData));

    if (registerAsync.fulfilled.match(resultAction)) {
      dispatch(
        setMessage({
          payload: "User registered successfully",
          type: "success",
        }),
      );
    }
  };

  return (
    <div className="RegisterForm">
      <RegisterForm>
        <CustomForm
          className="registerForm"
          onSubmit={handleSubmit}
          submitButtonText="Register"
          isLoading={loading}
          disableSubmit={disableSubmit}
          alertMessage={uiMessage}
          alertVariant={uiState === "error" ? "error" : "success"}
          onAlertClose={() => dispatch(resetMessage())}
        >
          <Logo />
          {uiState && (
            <CustomAlert
              variant={uiState === "error" ? "error" : "success"}
              onClose={dispatch(resetMessage())}
            >
              {uiMessage}
            </CustomAlert>
          )}
          <div className="register">Register</div>

          <FormContainer>
            <CustomLabel htmlFor="username">Username:</CustomLabel>
            <CustomInput
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              required
            />

            <CustomLabel htmlFor="email">Email:</CustomLabel>
            <CustomInput
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <CustomLabel htmlFor="password">Password:</CustomLabel>
            <CustomInput
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <CustomLabel htmlFor="passwordConfirmation">
              Repeat Password:
            </CustomLabel>
            <CustomInput
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChange}
              placeholder="Repeat password"
              required
            />

            <CustomLabel htmlFor="birthdate">Birthdate:</CustomLabel>
            <CustomInput
              type="date"
              name="birthdate"
              id="birthdate"
              value={birthdate}
              onChange={handleChange}
              required
            />

            <div>
              <CustomInput
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={handleChange}
                required
              />
              <CustomLabel htmlFor="acceptTerms">
                By creating an account, you agree to our
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terms and conditions
                </a>
                . Read our
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy and cookies policy
                </a>
                to find out how we collect and use your personal data.
              </CustomLabel>
            </div>
          </FormContainer>

          <div>
            <CustomInput
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeStatus}
            />
            <CustomLabel htmlFor="rememberMe">Remember me</CustomLabel>
          </div>
        </CustomForm>
      </RegisterForm>
    </div>
  );
};

export default RegisterPage;

import styled from "styled-components";

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-100);
`;

const FormContainer = styled.form`
  width: 400px;
  padding: 2rem;
  border-radius: 5px;
  background-color: var(--bg-200);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const CustomLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.8rem;
  color: var(--text-100);
`;

const CustomInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-1);
  border-radius: 3px;
  font-size: 1rem;
  margin-bottom: 15px;
`;

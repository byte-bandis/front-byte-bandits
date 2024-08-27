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
  const uiMessageArray = uiMessage ? uiMessage.split(".") : [];
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
      dispatch(resetValidationErrors());
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

  return (
    <Register className="RegisterForm">
      <CustomForm
        className="registerForm"
        onSubmit={handleSubmit}
        submitButtonText="Register"
        isLoading={loading}
        disableSubmit={disableSubmit}
        alertMessage={uiMessage}
        alertVariant={uiState === "error" ? "error" : "success"}
        onAlertClose={() => {
          dispatch(resetMessage());
          dispatch(resetValidationErrors());
        }}
      >
        <Logo />

        <div className="register">Register</div>

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

          <CheckedContainers>
            <CustomInputChecked
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={handleChange}
              required
            />
            <CustomLabel htmlFor="acceptTerms">
              By creating an account, you agree to our &nbsp;
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms and conditions
              </a>
              . Read our &nbsp;
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy and cookies policy &nbsp;
              </a>
              to find out how we collect and use your personal data.
            </CustomLabel>
          </CheckedContainers>

          <CheckedContainers>
            <CustomInputChecked
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeStatus}
            />
            <CustomLabel htmlFor="rememberMe">Remember me</CustomLabel>
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
  background-color: var(--bg-100);
  .button {
    margin: 0 100px;
  }
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 2rem;
  border-radius: 5px;
  background-color: var(--bg-200);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const CheckedContainers = styled.div`
  display: flex;
  gap: 5px;
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

const CustomInputChecked = styled.input`
  display: block;
  padding: 0px;
  border: 1px solid var(--border-1);
  border-radius: 3px;
  font-size: 1rem;
  margin-bottom: 15px;
`;

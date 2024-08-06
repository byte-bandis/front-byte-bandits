import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import {
  setValidations,
  registerAsync,
  resetForm,
} from "../../store/registerSlice";
import Logo from "../../assets/images/logo.svg";
import "../auth/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { checkAllFieldsFilled, validate } from "../../utils/formValidations";
import { resetMessage } from "../../store/uiSlice";
import { getUIMessage, getUIState } from "../../store/selectors";
import { getIsLogged } from "../../store/selectors";
import { loginWithThunk } from "../../store/loginThunk";

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

  const [rememberMe, setRememberMeStatus] = useState(false);
  const handleRememberMeStatus = (event) => {
    setRememberMeStatus(event.target.checked);
  };
  const isLogged = useSelector(getIsLogged);

  const to = import.meta.env.VITE_LOGIN_REDIRECT_URI;

  const { loading, validationErrors } = useSelector((state) => state.register);

  useEffect(() => {
    if (isLogged.authState) {
      navigate(to, { replace: true });
    }
  }, [isLogged.authState, to, navigate]);

  useEffect(() => {
    checkAllFieldsFilled({
      formData,
    });
  }, [formData]);

  const {
    email,
    password,
    passwordConfirmation,
    birthdate,
    username,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate({ password, passwordConfirmation, birthdate });
    dispatch(setValidations(errors));
    if (Object.keys(errors).length > 0) {
      return;
    }
    dispatch(registerAsync(formData));
  };

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Register</div>
        {uiState === "error" && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => dispatch(resetMessage())}
            dismissible
          >
            {uiMessage}
          </Alert>
        )}
        {uiState === "success" && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => dispatch(resetMessage())}
            dismissible
          >
            {uiMessage}
          </Alert>
        )}
        {Object.keys(validationErrors).map((key) => (
          <Alert key={key} className="mb-2" variant="warning">
            {validationErrors[key]}
          </Alert>
        ))}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="repeatpassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Repeat Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={birthdate}
            placeholder="Birthdate"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check
            type="checkbox"
            name="acceptTerms"
            checked={acceptTerms}
            onChange={handleChange}
            label={
              <>
                By creating an account you are agreeing to our{" "}
                <NavLink to="/terms-and-conditions" target="_blank">
                  terms and conditions (opens in new window)
                </NavLink>
                . Read our{" "}
                <NavLink to="/privacy-policy" target="_blank">
                  privacy and cookies policy (opens in new window)
                </NavLink>{" "}
                to find out how we collect and use your personal data.
              </>
            }
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="rememberMe">
          <Form.Check
            type="checkbox"
            label="Remember me"
            checked={rememberMe}
            onChange={handleRememberMeStatus}
          />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={
            !checkAllFieldsFilled({
              username,
              email,
              password,
              passwordConfirmation,
              birthdate,
              acceptTerms,
            }) || loading
          }
        >
          {loading ? "Registering... " : "Register"}
        </Button>
      </Form>
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default RegisterPage;

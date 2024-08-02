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
import { checkAllFieldsFilled, validate } from "./validations";
import { resetError } from "../../store/errorSlice";
import { resetSuccess } from "../../store/successSlice";

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

  const {
    username,
    email,
    password,
    passwordConfirmation,
    birthdate,
    acceptTerms,
  } = formData;

  const { loading, validationErrors } = useSelector((state) => state.register);
  const errorState = useSelector((state) => state.error.errorState);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const successState = useSelector((state) => state.success.successState);
  const successMessage = useSelector((state) => state.success.successMessage);

  useEffect(() => {
    if (successState) {
      const timer = setTimeout(() => {
        navigate("/");
        dispatch(resetSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successState, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    dispatch(resetError());
    dispatch(resetSuccess());
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

  const handlePassword = () => {};

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
        {errorState && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => dispatch(resetError())}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
        {successState && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => dispatch(resetSuccess())}
            dismissible
          >
            {successMessage}
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
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Byte-Bandits | &copy;2024
      </div>
    </div>
  );
};

export default RegisterPage;

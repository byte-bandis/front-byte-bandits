import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import {
  registerUser,
  setLoading,
  setError,
  setSuccess,
  setValidations,
} from "../store/registerSlice";
import { register } from "../pages/auth/register";
import Logo from "../assets/images/logo.svg";
import "../pages/auth/login.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username,
    email,
    password,
    passwordConfirmation,
    birthdate,
    acceptTerms,
    loading,
    error,
    success,
    validationErrors,
  } = useSelector((state) => state.register);

  useEffect(() => {
    checkAllFieldsFilled();
  }, [username, email, password, passwordConfirmation, birthdate, acceptTerms]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    dispatch(
      registerUser({
        name,
        value: type === "checkbox" ? checked : value,
      }),
    );
  };

  const validate = () => {
    const newErrors = {};
    const userAge = () => {
      const userBirthDate = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - userBirthDate.getFullYear();
      const monthDifference = today.getMonth() - userBirthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < userBirthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    if (password.length < 6) {
      newErrors.password = "Password length requires at least 6 characters";
    }
    if (password !== passwordConfirmation) {
      newErrors.password = "Passwords are different";
    }
    if (userAge() < 18 || userAge() > 120) {
      newErrors.birthdate = "User need to be at least 18 years old";
    }
    return newErrors;
  };

  const checkAllFieldsFilled = () => {
    const formValues = {
      username,
      email,
      password,
      passwordConfirmation,
      birthdate,
      acceptTerms,
    };
    const areAllFieldsFilled = Object.values(formValues).every(
      (value) => value !== "" && value !== false,
    );
    return areAllFieldsFilled;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(setSuccess(null));
    const errors = validate();
    dispatch(setValidations(errors));
    if (Object.keys(errors).length > 0) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const response = await register({
        username,
        email,
        password,
        passwordConfirmation,
        birthdate,
        acceptTerms,
      });
      dispatch(setSuccess("User created correctly"));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
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
        {error && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => dispatch(setError(null))}
            dismissible
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => dispatch(setSuccess(null))}
            dismissible
          >
            {success}
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
                <a
                  href="../../components/userConditions/TermsAndConditions.jsx"
                  target="_blank"
                >
                  terms and conditions (opens in new window)
                </a>
                . Read our{" "}
                <a href="" target="_blank">
                  privacy and cookies policy (opens in new window)
                </a>{" "}
                to find out how we collect and use your personal data.
              </>
            }
          />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={!checkAllFieldsFilled() || loading}
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
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default RegisterPage;

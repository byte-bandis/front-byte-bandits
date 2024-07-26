import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import { register } from "./register";
import Logo from "../../assets/images/logo.svg";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: "",
    address: "",
    creditCard: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const userAge = () => {
      const userBirthDate = new Date(formValues.birthdate);
      const today = new Date();
      let age = today.getFullYear() - userBirthDate.getFullYear();
      const monthDifference = today.getMonth() - userBirthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < userBirthDate.getDate)
      ) {
        age--;
      }
      return age;
    };

    if (formValues.password.length < 6) {
      newErrors.password = "Password length requires at least 6 characters ";
    }
    if (userAge() < 10) {
      newErrors.birthdate = "User need to be al least 10 years old";
    }

    const creditCardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!creditCardRegex.test(formValues.creditCard)) {
      newErrors.creditCard =
        "Credit card format required is 1234 1234 1234 1234";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const errors = validate();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await register(formValues);
      setSuccess(response.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = () => {};

  const {
    username,
    name,
    lastname,
    email,
    password,
    birthdate,
    address,
    creditCard,
  } = formValues;

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
            onClose={() => setError(null)}
            dismissible
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setSuccess(null)}
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
        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="lastname">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Last name"
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
        {/* <Form.Group className="mb-2" controlId="repeatpassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            name="RepeatPassword"
            value={RepeatPassword}
            placeholder="Repeat Password"
            onChange={handleChange}
            required
          />
        </Form.Group> */}
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
        <Form.Group className="mb-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={address}
            placeholder="Address"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="creditCard">
          <Form.Label>Credit card</Form.Label>
          <Form.Control
            type="text"
            name="creditCard"
            value={creditCard}
            placeholder="Credit card 1234 1234 1234 1234"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Registering...
          </Button>
        )}
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

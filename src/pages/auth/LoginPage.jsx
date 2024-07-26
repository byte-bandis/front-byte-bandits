import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginThunk } from "../../store/authSlice";
import { resetError } from "../../store/errorSlice";
import "./login.css";

import Logo from "../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.from || "/";
  const { errorState, errorMessage, errorStatus } = useSelector(
    (state) => state.errorState
  );

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorState) {
      setShow(true);
    }
  }, [errorState]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await dispatch(loginThunk(inputEmail, inputPassword));
      navigate(to, { replace: true });
    } catch (error) {
      console.log(error.message);
      //throw error
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetError());
    setShow(false);
  };
  const handlePassword = () => {};

  return (
    <div className="sign-in__wrapper">
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={handleCloseErrorAlert}
            dismissible
          >
            {errorStatus === 500
              ? "Incorrect username or password."
              : errorMessage}
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group
          className="mb-2"
          controlId="email"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-2"
          controlId="password"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group
          className="mb-2"
          controlId="checkbox"
        >
          <Form.Check
            type="checkbox"
            label="Remember me"
          />
        </Form.Group>
        {!loading ? (
          <Button
            className="w-100"
            variant="primary"
            type="submit"
          >
            Log In
          </Button>
        ) : (
          <Button
            className="w-100"
            variant="primary"
            type="submit"
            disabled
          >
            Logging In...
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
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default LoginPage;

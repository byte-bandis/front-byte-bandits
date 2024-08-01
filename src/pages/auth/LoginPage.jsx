import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginWithThunk } from "../../store/loginThunk";

import { resetError } from "../../store/errorSlice";
import "./login.css";

import Logo from "../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const to = import.meta.env.VITE_LOGIN_REDIRECT_URI;
  const { error, loading, authState } = useSelector((state) => state.authState);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  const [show, setShow] = useState(false);

  const resetForm = () => {
    setInputEmail("");
    setInputPassword("");
    setCheckboxStatus(false);
  };

  console.log("Esto es authState: ", authState);
  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (authState) {
      resetForm();
      const timer = setTimeout(() => {
        console.log("esto es el nuevo authState: ", authState);
        navigate(to, { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authState, navigate, to]);

  const handleCheckboxChange = (event) => {
    setCheckboxStatus(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginWithThunk({
        email: inputEmail,
        password: inputPassword,
        requestStorage: checkboxStatus,
      })
    );
    dispatch(setAuth(true));
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
            {error}
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
            checked={checkboxStatus}
            onChange={handleCheckboxChange}
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
        Made by Byte-Bandits | &copy;2024
      </div>
    </div>
  );
};

export default LoginPage;

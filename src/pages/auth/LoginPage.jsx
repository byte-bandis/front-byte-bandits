import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginWithThunk } from "../../store/loginThunk";
//import { resetError } from "../../store/errorSlice";
import "./login.css";

import Logo from "../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getError,
  getIsLogged,
  getLoggedUser,
  getUIMessage,
} from "../../store/selectors";
import { resetMessage } from "../../store/uiSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const toRegister = "/register";
  const isError = useSelector(getError);
  const isLogged = useSelector(getIsLogged);
  const message = useSelector(getUIMessage);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [show, setShow] = useState(false);
  const resetForm = () => {
    setInputEmail("");
    setInputPassword("");
    setCheckboxStatus(false);
  };
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    if (isError) {
      setShow(true);
    }
  }, [isError]);

  useEffect(() => {
    if (isLogged.authState) {
      resetForm();
      setShow(false);
      const timer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLogged.authState, loggedUser, dispatch, navigate, from]);

  const handleToRegister = () => {
    navigate(toRegister, { replace: true });
  };

  const handleCheckboxChange = (event) => {
    setCheckboxStatus(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      loginWithThunk({
        email: inputEmail,
        password: inputPassword,
        requestStorage: checkboxStatus,
      })
    );
  };

  const handleCloseErrorAlert = () => {
    dispatch(resetMessage());
    setShow(false);
  };
  const handlePassword = () => {};

  return (
    <div className={`sign-in__wrapper ${isLogged.authState ? "hidden" : ""}`}>
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
        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={handleCloseErrorAlert}
            dismissible
          >
            {message}
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
        {!isLogged.loading ? (
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
        <div className="d-flex justify-content-between">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handleToRegister}
          >
            Register new user
          </Button>
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

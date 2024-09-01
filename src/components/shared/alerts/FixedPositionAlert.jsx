// FixedPositionAlert.js
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../../store/uiSlice";
import { getUIMessage, getUIState } from "../../../store/selectors";

const FixedPositionAlert = () => {
  const dispatch = useDispatch();
  const uiState = useSelector(getUIState);
  const uiMessage = useSelector(getUIMessage);
  const [showError, setShowError] = useState(false);
  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    if (uiState === "error") {
      setShowError(true);
      // Calculate alert position
      const calculatePosition = () => {
        const viewportHeight = window.innerHeight;
        const rect = document.documentElement.getBoundingClientRect();

        if (rect.top < viewportHeight / 3) {
          setPosition("top-right");
        } else if (rect.bottom > (viewportHeight * 2) / 3) {
          setPosition("bottom-left");
        } else {
          setPosition("top-left");
        }
      };

      calculatePosition();
      window.addEventListener("resize", calculatePosition);
      return () => window.removeEventListener("resize", calculatePosition);
    }
  }, [uiState]);

  const handleCloseError = () => {
    setShowError(false);
    dispatch(resetMessage());
  };

  const getAlertStyle = () => {
    switch (position) {
      case "top-right":
        return { position: "fixed", top: "300px", right: "10px", zIndex: 9999 };
      case "top-left":
        return { position: "fixed", top: "300px", left: "10px", zIndex: 9999 };
      case "bottom-left":
        return {
          position: "fixed",
          bottom: "300px",
          left: "10px",
          zIndex: 9999,
        };
      case "bottom-right":
        return {
          position: "fixed",
          bottom: "300px",
          right: "10px",
          zIndex: 9999,
        };
      default:
        return {};
    }
  };

  if (!showError) return null;

  return (
    <Alert
      className="alert alert-danger"
      style={getAlertStyle()}
      dismissible
      onClick={handleCloseError}
    >
      {uiMessage}
    </Alert>
  );
};

export default FixedPositionAlert;

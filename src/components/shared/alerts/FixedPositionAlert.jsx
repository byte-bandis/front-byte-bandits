import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types"; // Importa PropTypes
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../../../store/uiSlice";
import { getUIMessage, getUIState } from "../../../store/selectors";

// Styled Alert Component
const AlertWrapper = styled.div`
  position: fixed;
  top: ${(props) => props.$customTop || "auto"};
  right: ${(props) => props.$customRight || "auto"};
  bottom: ${(props) => props.$customBottom || "auto"};
  left: ${(props) => props.$customLeft || "auto"};
  background-color: ${(props) => props.$customBackgroundColor || "#f8d7da"};
  color: ${(props) => props.$customColor || "#721c24"};
  border: ${(props) => props.$customBorder || "1px solid #f5c6cb"};
  border-radius: ${(props) => props.$customBorderRadius || "4px"};
  padding: ${(props) => props.$customPadding || "15px"};
  box-shadow: ${(props) =>
    props.$customBoxShadow || "0 0 10px rgba(0, 0, 0, 0.1)"};
  z-index: ${(props) => props.$customZIndex || "9999"};
  cursor: pointer;
`;

const AlertContent = styled.div`
  display: flex;
  justify-content: ${(props) => props.$customJustifyContent || "space-between"};
  align-items: ${(props) => props.$customAlignItems || "center"};
  padding: ${(props) => props.$customContentPadding || "0"};
  margin: ${(props) => props.$customContentMargin || "0"};
`;

const FixedPositionAlert = ({
  position = "top-right",
  top,
  right,
  bottom,
  left,
  $customTop,
  $customRight,
  $customBottom,
  $customLeft,
  $customBackgroundColor,
  $customColor,
  $customBorder,
  $customBorderRadius,
  $customPadding,
  $customBoxShadow,
  $customZIndex,
  $customJustifyContent,
  $customAlignItems,
  $customContentPadding,
  $customContentMargin,
}) => {
  const dispatch = useDispatch();
  const uiState = useSelector(getUIState);
  const uiMessage = useSelector(getUIMessage);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (uiState === "error") {
      setShowError(true);
    }
  }, [uiState]);

  const handleCloseError = () => {
    setShowError(false);
    dispatch(resetMessage());
  };

  if (!showError) return null;

  return (
    <AlertWrapper
      $customTop={
        position === "top-right"
          ? top || $customTop || "20px"
          : position === "top-left"
          ? top || $customTop || "20px"
          : position === "bottom-left"
          ? bottom || $customBottom || "20px"
          : position === "bottom-right"
          ? bottom || $customBottom || "20px"
          : "auto"
      }
      $customRight={
        position === "top-right" ? right || $customRight || "20px" : "auto"
      }
      $customBottom={
        position === "bottom-left" || position === "bottom-right"
          ? bottom || $customBottom || "20px"
          : "auto"
      }
      $customLeft={
        position === "top-left" || position === "bottom-left"
          ? left || $customLeft || "20px"
          : "auto"
      }
      $customBackgroundColor={$customBackgroundColor}
      $customColor={$customColor}
      $customBorder={$customBorder}
      $customBorderRadius={$customBorderRadius}
      $customPadding={$customPadding}
      $customBoxShadow={$customBoxShadow}
      $customZIndex={$customZIndex}
      onClick={handleCloseError}
    >
      <AlertContent
        $customJustifyContent={$customJustifyContent}
        $customAlignItems={$customAlignItems}
        $customContentPadding={$customContentPadding}
        $customContentMargin={$customContentMargin}
      >
        <span>{uiMessage}</span>
        <button
          onClick={handleCloseError}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#721c24",
            fontSize: "1.5rem",
          }}
        ></button>
      </AlertContent>
    </AlertWrapper>
  );
};

// Añade PropTypes para el componente
FixedPositionAlert.propTypes = {
  position: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-left",
    "bottom-right",
  ]),
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  $customTop: PropTypes.string,
  $customRight: PropTypes.string,
  $customBottom: PropTypes.string,
  $customLeft: PropTypes.string,
  $customBackgroundColor: PropTypes.string,
  $customColor: PropTypes.string,
  $customBorder: PropTypes.string,
  $customBorderRadius: PropTypes.string,
  $customPadding: PropTypes.string,
  $customBoxShadow: PropTypes.string,
  $customZIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  $customJustifyContent: PropTypes.string,
  $customAlignItems: PropTypes.string,
  $customContentPadding: PropTypes.string,
  $customContentMargin: PropTypes.string,
};

export default FixedPositionAlert;

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();
  const { authState } = useSelector((state) => state.authState);

  console.log("Y esto es authState en Require auth: ", authState);
  return authState ? (
    children
  ) : (
    /* children */
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    />
  );
}

export default RequireAuth;

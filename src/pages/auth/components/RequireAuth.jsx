import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import P from "prop-types";
import { getIsLogged } from "../../../store/selectors";

function RequireAuth({ children }) {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);

  return isLogged.authState ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
}

RequireAuth.propTypes = {
  children: P.node.isRequired,
};

export default RequireAuth;

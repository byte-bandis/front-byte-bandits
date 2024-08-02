import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import P from "prop-types";
import { getIsLogged } from "../../../store/selectors";

function RequireAuth({ children }) {
  const location = useLocation();
  const isLogged = useSelector(getIsLogged);
  //const isLogged = false;
  console.log("Esto es isLogged.authState: ", isLogged.authState);

  return isLogged.authState ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace
    />
  );
}

RequireAuth.propTypes = {
  children: P.node.isRequired,
};

export default RequireAuth;

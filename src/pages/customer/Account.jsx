import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import {
  getMyAccountWithThunk,
  getSinglePublicProfileWithThunk,
} from "../../store/profilesThunk";

const Account = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedUserName);
  useEffect(() => {
    if (isLogged) {
      dispatch(getMyAccountWithThunk(isLogged));
      dispatch(getSinglePublicProfileWithThunk(isLogged));
    }
  }, [isLogged, dispatch]);

  return (
    <>
      {<h1>{isLogged}, welcome to your private area</h1>}
      <Profile />
      <ProductList />
    </>
  );
};

export default Account;

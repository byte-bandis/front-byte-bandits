import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import { getMyAccountWithThunk } from "../../store/profilesThunk";
import storage from "../../utils/storage";

const Account = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedUserName);
  const accessToken = storage.get("authToken");
  console.log("Esto es accessToken en myAccount: ", accessToken);
  console.log("Esto es isLogged en myAccount: ", isLogged);
  useEffect(() => {
    if (isLogged) {
      dispatch(getMyAccountWithThunk(isLogged));
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

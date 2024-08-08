import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUser } from "../../store/selectors";
import { useEffect } from "react";
import { getMyProfileWithThunk } from "../../store/profilesThunk";

const Account = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedUser);
  useEffect(() => {
    if (isLogged) {
      dispatch(getMyProfileWithThunk(isLogged.userName));
    }
  }, [isLogged, dispatch]);

  return (
    <>
      <h1>Welcome to your private area</h1>
      <Profile />
      <ProductList />
    </>
  );
};

export default Account;

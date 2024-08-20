import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import { getMyAccountWithThunk } from "../../store/profilesThunk";

const Account = () => {
  const dispatch = useDispatch();
  const loggedUserName = useSelector(getLoggedUserName);
  useEffect(() => {
    const fetchData = async () => {
      if (loggedUserName) {
        await dispatch(getMyAccountWithThunk(loggedUserName));
      }
    };
    fetchData();
  }, [loggedUserName, dispatch]);

  return (
    <>
      {<h1>{loggedUserName}, welcome to your private area</h1>}
      <Profile />
      <ProductList />
    </>
  );
};

export default Account;

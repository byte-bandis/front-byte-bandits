import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUser } from "../../store/selectors";
import { useEffect } from "react";
import { getMyProfileWithThunk } from "../../store/profilesThunk";
import { useParams } from "react-router-dom";
import { setMyProfile } from "../../store/myProfileSlice";
import storage from "../../utils/storage";

const Account = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedUser);
  const { username } = useParams();
  const accessToken = storage.get("authToken");
  console.log("Esto es accessToken en myAccount: ", accessToken);
  console.log("Esto es isLogged.userName en myAccount: ", isLogged.username);
  useEffect(() => {
    if (isLogged) {
      dispatch(getMyProfileWithThunk(isLogged.userName));
      if (isLogged.usermame === username) {
        dispatch(getMyProfileWithThunk(username));
      }
    }
    if (accessToken) {
      dispatch(getMyProfileWithThunk(isLogged.userName));
    }
  }, [isLogged, username, dispatch, accessToken]);

  return (
    <>
      {<h1>{isLogged.userName}, welcome to your private area</h1>}
      <Profile />
      <ProductList />
    </>
  );
};

export default Account;

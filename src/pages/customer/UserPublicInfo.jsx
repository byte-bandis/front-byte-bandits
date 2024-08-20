import { useDispatch, useSelector } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";

const UserPublicInfo = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getLoggedUserName);
  useEffect(() => {
    const fetchData = async () => {
      if (isLogged) {
        await dispatch(getSinglePublicProfileWithThunk(isLogged));
      }
    };
    fetchData();
  }, [isLogged, dispatch]);

  return (
    <>
      {<h1>{isLogged}, welcome to your public area</h1>}
      <Profile />
      <ProductList />
    </>
  );
};

export default UserPublicInfo;

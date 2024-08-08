import { useDispatch } from "react-redux";
import ProductList from "./PoductList";
import Profile from "./Profile";
import { useEffect } from "react";
import { getProfilesWithThunk } from "../../store/publicProflesThunk";
import { getPublicProfiles } from "./service";

const Account = () => {
  //console.log("Esto es perfiles: ", perfiles);
  const dispatch = useDispatch();
  dispatch(getProfilesWithThunk());

  return (
    <>
      <h1>Welcome to your private area</h1>
      <Profile />
      <ProductList />
    </>
  );
};

export default Account;

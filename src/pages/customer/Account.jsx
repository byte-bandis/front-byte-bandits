import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import { getMyAccountWithThunk } from "../../store/profilesThunk";
import StyledMyAccount from "../../components/shared/StyledMyAccount";

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
      <StyledMyAccount>
        {<h1>{loggedUserName}, welcome to your private area</h1>}
        <Profile />
      </StyledMyAccount>
    </>
  );
};

export default Account;

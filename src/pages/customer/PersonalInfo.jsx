import { useDispatch } from "react-redux";
import { RegularButton } from "../../components/shared/buttons";
import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";
import MyData from "./myPersonalInfo/components/UserData";
import { deleteUserWithThunk } from "../../store/userThunk";
import { useParams } from "react-router-dom";
import { logout } from "../auth/service";

const PersonalInfo = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const handleDeletion = () => {
    dispatch(deleteUserWithThunk(username));
    logout();
  };
  return (
    <>
      <h1>These are your personal details</h1>
      <MyData />
      <Address />
      <CreditCard />
      <RegularButton onClick={handleDeletion}>Delete user</RegularButton>
    </>
  );
};

export default PersonalInfo;

import { useDispatch } from "react-redux";
import { RegularButton } from "../../components/shared/buttons";
import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";
import MyData from "./myPersonalInfo/components/UserData";
import { deleteUserWithThunk } from "../../store/userThunk";
import { useParams } from "react-router-dom";
import { logout } from "../auth/service";
import StyledContainer from "../../components/shared/StyledContainer";

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
      <StyledContainer
        $customDisplay="flex"
        $customFlexDirection="row"
        $customJustifyItems="flex-start"
      >
        <MyData />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="bi bi-person-square"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>
      </StyledContainer>
      <Address />
      <CreditCard />
      <RegularButton onClick={handleDeletion}>Delete user</RegularButton>
    </>
  );
};

export default PersonalInfo;

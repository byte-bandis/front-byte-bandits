import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";
import MyData from "./myPersonalInfo/components/UserData";

const PersonalInfo = () => {
  return (
    <>
      <h1>These are your personal details</h1>
      <MyData />
      <Address />
      <CreditCard />
    </>
  );
};

export default PersonalInfo;

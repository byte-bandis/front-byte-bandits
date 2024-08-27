import Address from "./myPersonalInfo/components/Address";
import CreditCard from "./myPersonalInfo/components/PaymentMethod";

const PersonalInfo = () => {
  return (
    <>
      <h1>These are your personal details</h1>
      <Address />
      <CreditCard />
    </>
  );
};

export default PersonalInfo;

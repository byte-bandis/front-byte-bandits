import StyledMyAccount from "../../../../components/shared/StyledMyAccount";
import ConfirmPasswordStep from "./ConfirmPasswordStep";
import { useState } from "react";
import UsernameEmail from "./UsernameEmail";

const UserNameEmailUpdate = () => {
  const [showPasswordConfirmator, setShowPasswordConfirmator] = useState(true);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  const handlePasswordConfirmed = () => {
    setShowUpdateConfirmation(true);
    setShowPasswordConfirmator(false);
  };

  return (
    <StyledMyAccount>
      {showPasswordConfirmator && (
        <ConfirmPasswordStep onPasswordConfirmed={handlePasswordConfirmed} />
      )}
      {showUpdateConfirmation && <UsernameEmail />}
    </StyledMyAccount>
  );
};

export default UserNameEmailUpdate;

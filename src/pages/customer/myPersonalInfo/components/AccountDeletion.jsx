import StyledMyAccount from "../../../../components/shared/StyledMyAccount";
import ConfirmPasswordStep from "./ConfirmPasswordStep";
import DeleteMyAccount from "../../DeleteMyAccount";
import { useState } from "react";

const AccountDeletion = () => {
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState(false);

  const handlePasswordConfirmed = () => {
    setShowDeletionConfirmation(true);
  };

  return (
    <StyledMyAccount>
      <ConfirmPasswordStep onPasswordConfirmed={handlePasswordConfirmed} />
      {showDeletionConfirmation && <DeleteMyAccount />}
    </StyledMyAccount>
  );
};

export default AccountDeletion;

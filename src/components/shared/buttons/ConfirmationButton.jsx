import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import RegularButton from "./RegularButton";
import ButtonContainer from "./ButtonContainer";

const SendConfirmedSelection = ({ requestedAction, children }) => {
  const dispatch = useDispatch();
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [submitConfirmed, setSubmitConfirmed] = useState(false);

  useEffect(() => {
    if (submitConfirmed) {
      dispatch(requestedAction());
      setSubmitConfirmed(false);
      setConfirmProcess(false);
    }
  }, [submitConfirmed, dispatch, requestedAction]);

  const handleSubmit = () => setConfirmProcess(true);

  const handleConfirmSubmit = () => setSubmitConfirmed(true);

  const handleCancelSubmit = () => setConfirmProcess(false);

  return (
    <>
      {!confirmProcess && (
        <RegularButton
          $customMargin="2rem 0 0 0"
          onClick={handleSubmit}
        >
          {children || "Submit"}
        </RegularButton>
      )}

      {confirmProcess && (
        <>
          <ButtonContainer
            justifyContent="flex-start"
            marginContainer="2rem 0 0 0"
          >
            <RegularButton
              onClick={handleConfirmSubmit}
              $customHoverBackgroundColor="var(--accent-100)"
            >
              Confirm submit
            </RegularButton>
            <RegularButton onClick={handleCancelSubmit}>
              Cancel submit
            </RegularButton>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

SendConfirmedSelection.propTypes = {
  requestedAction: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SendConfirmedSelection;

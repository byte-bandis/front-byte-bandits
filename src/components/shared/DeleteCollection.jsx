import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../pages/product/components/Button";
import { useEffect, useState } from "react";
//import { Alert, Spinner } from "react-bootstrap";

// Styled components
const DeleteCollectionButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DeleteCollection = ({ username, requestedAction, wrapUpAction }) => {
  const dispatch = useDispatch();
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);

  useEffect(() => {
    if (deletionConfirmed) {
      dispatch(requestedAction(username));
      setConfirmProcess(false);
      setDeletionConfirmed(false);
      dispatch(wrapUpAction(username));
    }
  }, [dispatch, username, requestedAction, wrapUpAction, deletionConfirmed]);

  const handleDeletion = () => {
    setConfirmProcess(true);
  };

  return (
    <>
      {!confirmProcess && (
        <DeleteCollectionButton onClick={handleDeletion}>
          Delete Profile
        </DeleteCollectionButton>
      )}
      {confirmProcess && (
        <>
          <p>Are you sure you want to delete this?</p>

          <ButtonContainer>
            <Button onClick={() => setDeletionConfirmed(true)}>
              Confirm deletion
            </Button>
            <Button onClick={() => setConfirmProcess(false)}>
              Cancel deletion
            </Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

DeleteCollection.propTypes = {
  username: PropTypes.string.isRequired,
  requestedAction: PropTypes.func.isRequired,
  wrapUpAction: PropTypes.func.isRequired,
};

export default DeleteCollection;

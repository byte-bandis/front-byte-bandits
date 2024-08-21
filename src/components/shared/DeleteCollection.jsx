import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../pages/product/components/Button";
import { useEffect, useState } from "react";

// Styled components
const DeleteCollectionButton = styled.button`
  background-color: ${({ backgroundColor }) => backgroundColor || "red"};
  color: ${({ color }) => color || "white"};
  border: ${({ border }) => border || "none"};
  padding: ${({ padding }) => padding || "10px 20px"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  cursor: ${({ cursor }) => cursor || "pointer"};
  border-radius: ${({ borderRadius }) => borderRadius || "5px"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "darkred"};
  }
`;

DeleteCollectionButton.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  cursor: PropTypes.string,
  borderRadius: PropTypes.string,
  hoverColor: PropTypes.string,
  children: PropTypes.node,
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  gap: ${({ gap }) => gap || "10px"};
`;

ButtonContainer.propTypes = {
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  gap: PropTypes.string,
};

const DeleteCollection = ({
  username,
  requestedAction,
  wrapUpAction,
  children,
}) => {
  const dispatch = useDispatch();
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const [wrapUpTrigger, setWrapUpTrigger] = useState(false);
  console.log("Esto es wrapUpAction: ", wrapUpAction);
  console.log("Esto es wrapUpTrigger: ", wrapUpTrigger);

  useEffect(() => {
    if (deletionConfirmed) {
      dispatch(requestedAction(username));
      setDeletionConfirmed(false);
      setConfirmProcess(false);
      setWrapUpTrigger(true);
    }
  }, [deletionConfirmed, dispatch, username, requestedAction]);

  useEffect(() => {
    if (wrapUpAction && wrapUpTrigger) {
      const fetchWrapUpAction = async () => {
        await dispatch(wrapUpAction(username));
      };
      fetchWrapUpAction();
      setWrapUpTrigger(false);
    }
  }, [wrapUpTrigger, dispatch, username, wrapUpAction]);

  const handleDeletion = () => setConfirmProcess(true);

  const handleConfirmDeletion = () => setDeletionConfirmed(true);

  const handleCancelDeletion = () => setConfirmProcess(false);

  return (
    <>
      {!confirmProcess && (
        <DeleteCollectionButton onClick={handleDeletion}>
          {children || "Delete"}
        </DeleteCollectionButton>
      )}

      {confirmProcess && (
        <>
          <p>Are you sure you want to delete this?</p>

          <ButtonContainer>
            <Button onClick={handleConfirmDeletion}>Confirm deletion</Button>
            <Button onClick={handleCancelDeletion}>Cancel deletion</Button>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

DeleteCollection.propTypes = {
  username: PropTypes.string.isRequired,
  requestedAction: PropTypes.func.isRequired,
  wrapUpAction: PropTypes.func,
  children: PropTypes.node,
};

export default DeleteCollection;

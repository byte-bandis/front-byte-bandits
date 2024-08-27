import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyPayment } from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { trimDate } from "../../../../utils/dateTools";
import {
  getMyCreditCardWithThunk,
  updateMyCreditCardWithThunk,
} from "../../../../store/MyPersonalData/myPaymentsThunk";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  ConfirmAndSendButton,
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";

const CreditCard = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myCreditCard = useSelector(getMyPayment);
  const { username } = useParams();
  const [creationDate, setCreationdate] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  console.log("Esto es myCreditCard: ", myCreditCard);

  const [creditCardData, setCreditCardData] = useState({
    creditCard: "",
  });

  const containerStyles = {
    $customDisplay: "flex",
    $customAlignItems: "flex-start",
    $customGap: "0",
    $customMarginTop: "1rem",
  };

  const listItemStyles = {
    $customDisplay: "flex",
    $customFlexDirection: "row",
    $customLabelFontWeight: "bold",
    $customInputPadding: "0 0 0 .5rem",
  };

  useEffect(() => {
    if (loggedUsername === username) {
      dispatch(getMyCreditCardWithThunk(username));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    if (myCreditCard.createdAt) {
      const trimmedDate = trimDate(myCreditCard.createdAt, "ES");
      setCreationdate(trimmedDate);
    }

    setCreditCardData({
      creditCard: myCreditCard.creditCard || "",
    });
  }, [myCreditCard]);

  const handleShowEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleHideEditMode = (event) => {
    event.preventDefault();
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCreditCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledListContainer>
        <ul key={myCreditCard._id}>
          <form>
            <StyledListItem $customHeaderFontSize="1.5rem">
              <h3>Credit card:</h3>
            </StyledListItem>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Credit card: </label>
                {!editMode ? (
                  <div>{myCreditCard.creditCard}</div>
                ) : (
                  <input
                    type="text"
                    name="creditCard"
                    value={creditCardData.creditCard}
                    onChange={handleInputChange}
                    placeholder="Write between 13 to 18 digits"
                    maxLength={18}
                    minLength={13}
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            {editMode ? (
              <ButtonContainer $justifyContent="flex-start">
                <ConfirmAndSendButton
                  username={username}
                  formData={creditCardData}
                  requestedAction={updateMyCreditCardWithThunk}
                >
                  Save card
                </ConfirmAndSendButton>

                <RegularButton
                  $customMargin="2rem 0 0 0"
                  onClick={handleHideEditMode}
                >
                  Back to your saved card
                </RegularButton>
              </ButtonContainer>
            ) : (
              <RegularButton
                $customMargin="2rem 0 0 0"
                onClick={handleShowEditMode}
              >
                Click to edit
              </RegularButton>
            )}
          </form>
          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <i>Credit card updated at:</i>
              <div>
                <i>{creationDate}</i>
              </div>
            </StyledListItem>
          </StyledContainer>
        </ul>
      </StyledListContainer>
    </>
  );
};

export default CreditCard;

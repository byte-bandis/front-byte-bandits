import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserName, getMyData } from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { PersonCircle } from "react-bootstrap-icons";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";

import {
  getMyDataWithThunk,
  updateMyDataWithThunk,
} from "../../../../store/MyPersonalData/myDataThunk";
import { validate } from "./userDataValidations";
import {
  resetValidationErrors,
  setValidations,
} from "../../../../store/MyPersonalData/myDataSlice";
import { resetMessage, setMessage } from "../../../../store/uiSlice";

const MyData = () => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const myData = useSelector(getMyData);
  const { username } = useParams();
  const [updateTime, setUpdateTime] = useState("000-00-00");
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    birthdate: "",
    mobilePhoneNumber: "",
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
      dispatch(getMyDataWithThunk(loggedUsername));
    }
  }, [username, loggedUsername, dispatch]);

  useEffect(() => {
    if (myData.updatedAt) {
      const formattedDate = moment(myData.updatedAt).format("DD-MM-YYYY");
      setUpdateTime(formattedDate);
    }

    setFormData({
      username: myData.username || "",
      name: myData.name || "",
      lastname: myData.lastname || "",
      email: myData.email || "",
      mobilePhoneNumber: myData.mobilePhoneNumber || "",
      birthdate: myData.birthdate
        ? moment(myData.birthdate).format("YYYY-MM-DD")
        : "",
    });
  }, [myData]);

  const handleShowEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  const handleConfirmProcess = (event) => {
    event.preventDefault();
    setConfirmProcess(true);
  };

  const handleHideEditMode = (event) => {
    event.preventDefault();
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate({
      name: formData.name,
      username: formData.username,
      lastname: formData.lastname,
      email: formData.email,
      birthdate: formData.birthdate,
      mobilePhoneNumber: formData.mobilePhoneNumber,
    });
    dispatch(setValidations(errors));

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join(" ");
      dispatch(setMessage({ payload: errorMessages, type: "error" }));
      return;
    }

    dispatch(updateMyDataWithThunk({ username, formData }));
    setConfirmProcess(false);
    setEditMode(false);
    dispatch(resetValidationErrors());
    dispatch(resetMessage());
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <>
      <StyledListContainer $customWidth="80%">
        <ul key={myData._id}>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <StyledListItem $customHeaderFontSize="1.5rem">
              <h3>Your data:</h3>
            </StyledListItem>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Nick name: </label>
                {!editMode ? (
                  <div>{myData.username}</div>
                ) : (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nick name must have at least 6 characters"
                  />
                )}
              </StyledListItem>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledContainer
                $customDisplay="flex"
                $customFlexDirection="row"
                $customGap="40px"
              >
                <StyledListItem {...listItemStyles}>
                  <label>Name: </label>
                  {!editMode ? (
                    <div>{myData.name}</div>
                  ) : (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                  )}
                </StyledListItem>
                <StyledListItem {...listItemStyles}>
                  <label>Last name: </label>
                  {!editMode ? (
                    <div>{myData.lastname}</div>
                  ) : (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                  )}
                </StyledListItem>
              </StyledContainer>
            </StyledContainer>
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Email: </label>
                {!editMode ? (
                  <div>{myData.email}</div>
                ) : (
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email can not be empty"
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Phone: </label>
                {!editMode ? (
                  <div>{myData.mobilePhoneNumber}</div>
                ) : (
                  <input
                    type="text"
                    name="mobilePhoneNumber"
                    value={formData.mobilePhoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>Birth date: </label>
                {!editMode ? (
                  <div>{moment(myData.birthdate).format("DD-MM-YYYY")}</div> // Display formatted date
                ) : (
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    placeholder="Birth date can not be empty"
                  />
                )}
              </StyledListItem>
            </StyledContainer>

            {editMode ? (
              <ButtonContainer $justifyContent="flex-start">
                {!confirmProcess && (
                  <>
                    <RegularButton
                      $customHoverBackgroundColor="var(--accent-100)"
                      $customMargin="2rem 0 0 0"
                      onClick={handleConfirmProcess}
                    >
                      Save your data
                    </RegularButton>
                    <RegularButton
                      $customMargin="2rem 0 0 0"
                      onClick={handleHideEditMode}
                    >
                      Back to your saved data
                    </RegularButton>
                  </>
                )}
                {confirmProcess && (
                  <>
                    <RegularButton
                      type="submit"
                      $customHoverBackgroundColor="var(--accent-100)"
                      $customMargin="2rem 0 0 0"
                    >
                      Confirm save
                    </RegularButton>
                    <RegularButton
                      $customMargin="2rem 0 0 0"
                      onClick={handleCancelSubmit}
                    >
                      Cancel
                    </RegularButton>
                  </>
                )}
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
          <PersonCircle
            width="75px"
            height="75px"
            color="var(--primary-200)"
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
            }}
          />
          {editMode && (
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <i>Last time you updated your data:</i>
                <div>
                  <i>{updateTime}</i>
                </div>
              </StyledListItem>
            </StyledContainer>
          )}
        </ul>
      </StyledListContainer>
    </>
  );
};

export default MyData;

import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserName,
  getMyData,
  getUIMessage,
  getUIState,
} from "../../../../store/selectors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";
import { Alert } from "react-bootstrap";
import {
  getMyDataWithThunk,
  updateMyDataWithThunk,
} from "../../../../store/MyPersonalData/myDataThunk";

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
  const uiState = useSelector(getUIState);
  const uiMessage = useSelector(getUIMessage);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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
    if (uiState !== "error" && loggedUsername === username) {
      dispatch(getMyDataWithThunk(loggedUsername));
    }
  }, [uiState, username, loggedUsername, dispatch]);

  useEffect(() => {
    if (uiState === "success") {
      setSuccessAlert(true);
      setErrorAlert(false);
      const timer = setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setErrorAlert(true);
      setSuccessAlert(false);
    }
  }, [uiState]);

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
        ? moment(myData.birthdate).format("DD-MM-YYYY")
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
    const formattedData = {
      ...formData,
      name: formData.name || "Your name",
      lastname: formData.lastname || "Your last name",
      mobilePhoneNumber: formData.mobilePhoneNumber || "Your phone number",
      //birthdate: moment(formData.birthdate, "DD-MM-YYYY").toISOString(),
    };
    dispatch(updateMyDataWithThunk({ username, formData: formattedData }));
    setConfirmProcess(false);
    setEditMode(false);
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <>
      {errorAlert && <Alert className="alert alert-danger">{uiMessage}</Alert>}
      {successAlert && (
        <Alert className="alert alert-success">{uiMessage}</Alert>
      )}

      <StyledListContainer>
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
                    type="text"
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

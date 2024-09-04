import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedUserId,
  getLoggedUserName,
} from "../../../../store/selectors";
import { useTranslation } from "react-i18next";

import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import {
  RegularButton,
  ButtonContainer,
} from "../../../../components/shared/buttons";
import { resetMessage } from "../../../../store/uiSlice";

import { Key } from "react-bootstrap-icons";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import { updateMyPasswordWithThunk } from "../../../../store/MyPersonalData/myPasswordThunk";
import { useState } from "react";

const PasswordUpdater = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loggedUsername = useSelector(getLoggedUserName);
  const loggedUserId = useSelector(getLoggedUserId);
  const [editMode, setEditMode] = useState(false);
  const [confirmProcess, setConfirmProcess] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const containerStyles = {
    $customDisplay: "flex",
    $customAlignItems: "flex-start",
    $customGap: "0",
    $customMargin: "1rem 0 0 0",
  };

  const listItemStyles = {
    $customDisplay: "flex",
    $customFlexDirection: "row",
    $customLabelFontWeight: "bold",
    $customInputPadding: "0 0 0 .5rem",
  };

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
    dispatch(updateMyPasswordWithThunk({ loggedUsername, formData }));

    setConfirmProcess(false);
    setEditMode(false);
    dispatch(resetMessage());
  };

  const handleCancelSubmit = () => {
    setConfirmProcess(false);
    setEditMode(false);
  };

  return (
    <StyledListContainer $customWidth="80%">
      <ul key={loggedUserId}>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <StyledListItem $customHeaderFontSize="1.5rem">
            <h3>{t("change_password")}</h3>
          </StyledListItem>

          <StyledContainer {...containerStyles}>
            <StyledListItem {...listItemStyles}>
              <label>{t("current_password_label")}</label>
              {!editMode ? (
                <div>{t("current_password_input")}</div>
              ) : (
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder={t("current_password_placeholder")}
                  required
                />
              )}
            </StyledListItem>
          </StyledContainer>
          {editMode && (
            <StyledContainer {...containerStyles}>
              <StyledListItem {...listItemStyles}>
                <label>{t("new_password_label")}</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder={t("new_password_placeholder")}
                  required
                />
              </StyledListItem>
            </StyledContainer>
          )}

          {editMode ? (
            <ButtonContainer $justifyContent="flex-start">
              {!confirmProcess && (
                <>
                  <RegularButton
                    $customHoverBackgroundColor="var(--accent-100)"
                    $customMargin="2rem 0 0 0"
                    onClick={handleConfirmProcess}
                  >
                    {t("save_new_password")}
                  </RegularButton>
                  <RegularButton
                    $customMargin="2rem 0 0 0"
                    onClick={handleHideEditMode}
                  >
                    {t("back_to_saved_password")}
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
                    {t("confirm_save")}
                  </RegularButton>
                  <RegularButton
                    $customMargin="2rem 0 0 0"
                    onClick={handleCancelSubmit}
                  >
                    {t("cancel")}
                  </RegularButton>
                </>
              )}
            </ButtonContainer>
          ) : (
            <RegularButton
              $customMargin="2rem 0 0 0"
              onClick={handleShowEditMode}
            >
              {t("click_to_edit")}
            </RegularButton>
          )}
        </form>
        <IconWrapper
          IconComponent={Key}
          size="75px"
          color="var(--primary-200)"
          top="10%"
          right="5%"
        />
      </ul>
    </StyledListContainer>
  );
};

export default PasswordUpdater;

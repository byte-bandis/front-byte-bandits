import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getLoggedUserName,
  getMyData,
} from "../../../../store/selectors";
import { useEffect } from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import {
  StyledListContainer,
  StyledListItem,
} from "../../../../components/shared/lists";
import StyledContainer from "../../../../components/shared/StyledContainer";
import { RegularButton } from "../../../../components/shared/buttons";

import { getMyDataWithThunk } from "../../../../store/MyPersonalData/myDataThunk";
import IconWrapper from "../../../../components/shared/iconsComponents/IconWrapper";
import CustomPulseLoader from "../../../../components/shared/spinners/CustomPulseLoader";
import { useNavigate } from "react-router-dom";

const UsernameEmailFace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loggedUsername = useSelector(getLoggedUserName);
  const myData = useSelector(getMyData);

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
  const isLoading = useSelector(getLoading);

  const handleNavigateToConfirmPassword = () => {
    navigate(`/${loggedUsername}/update-name-and-email`);
  };

  useEffect(() => {
    dispatch(getMyDataWithThunk(loggedUsername));
  }, [loggedUsername, dispatch]);

  return (
    <>
      <StyledListContainer $customWidth="80%">
        <ul key={myData._id}>
          {isLoading ? (
            <CustomPulseLoader
              loading={isLoading.toString()}
              $customHeight="200px"
            />
          ) : (
            <>
              <StyledListItem $customHeaderFontSize="1.5rem">
                <h3>{t("yourData")}</h3>
              </StyledListItem>

              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("nickname")}</label>
                  <div>{myData.username}</div>
                </StyledListItem>
              </StyledContainer>
              <StyledContainer {...containerStyles}>
                <StyledListItem {...listItemStyles}>
                  <label>{t("email")}</label>
                  <div>{myData.email}</div>
                </StyledListItem>
              </StyledContainer>
              <RegularButton
                $customMargin="2rem 0 0 0"
                onClick={handleNavigateToConfirmPassword}
              >
                {t("click_to_edit")}
              </RegularButton>
            </>
          )}
          <IconWrapper
            IconComponent={PersonCircle}
            size="75px"
            color="var(--primary-200)"
            top="10%"
            right="5%"
          />
        </ul>
      </StyledListContainer>
    </>
  );
};

export default UsernameEmailFace;

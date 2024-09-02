import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { getLoggedUserName } from "../../store/selectors";
import { useEffect } from "react";
import { getSinglePublicProfileWithThunk } from "../../store/profilesThunk";
import StyledContainer from "../../components/shared/StyledContainer";

const UserPublicInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isLogged = useSelector(getLoggedUserName);
  useEffect(() => {
    const fetchData = async () => {
      if (isLogged) {
        await dispatch(getSinglePublicProfileWithThunk(isLogged));
      }
    };
    fetchData();
  }, [isLogged, dispatch]);

  return (
    <>
      <StyledContainer $customMarginTop="2rem">
        <h1>{t("title_public_profile")}</h1>
      </StyledContainer>
      <Profile />
    </>
  );
};

export default UserPublicInfo;

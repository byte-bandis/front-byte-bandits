import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import StyledContainer from "../../components/shared/StyledContainer";
import { useParams } from "react-router-dom";
import MyProducts from "./MyProducts";

const UserPublicInfo = () => {
  const { t } = useTranslation();
  const { username } = useParams();
  const currentUrl = window.location.href;

  return (
    <>
      {currentUrl.includes(`${username}/info`) && (
        <StyledContainer $customMargin="2rem">
          <h1>{t("title_public_profile")}</h1>
        </StyledContainer>
      )}
      <Profile
        className={
          !currentUrl.includes(`${username}/info`) ? "profile-for-visitors" : ""
        }
      />
      <MyProducts
        className={
          !currentUrl.includes(`${username}/info`) ? "profile-for-visitors" : ""
        }
      />
    </>
  );
};

export default UserPublicInfo;

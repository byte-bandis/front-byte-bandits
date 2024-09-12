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
      {currentUrl.endsWith(`${username}/info`) && (
        <StyledContainer $customMargin="2rem">
          <h1>{t("title_public_profile")}</h1>
        </StyledContainer>
      )}
      <Profile />
      <MyProducts />
    </>
  );
};

export default UserPublicInfo;

import { Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderProfile from "./HeaderProfile";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import StyledContainer from "../../components/shared/StyledContainer";

const LayoutProfile = () => {
  const { t } = useTranslation();
  const loggedUserName = useSelector(getLoggedUserName);
  const { username } = useParams();

  return (
    <StyledMyAccount>
      {loggedUserName ? (
        <>
          <StyledContainer
            $customBackground="var(--primary-100)"
            $customPadding="1rem 1.5rem"
            $customBorderRadius="15px"
            $customWidth="80%"
          >
            {
              <h1 className="display-5 fw-bold">
                {t("welcome_you_zone", { username: loggedUserName })}
              </h1>
            }
            <p>{t("profile_zone_intro")}</p>
            <HeaderProfile />
          </StyledContainer>
          <Outlet />
        </>
      ) : (
        <>{t("no_info_found_for_username", { username: username })}</>
      )}
    </StyledMyAccount>
  );
};

export default LayoutProfile;

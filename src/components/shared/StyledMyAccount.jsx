import TagsNav from "./TagsNav";
import StyledContainer from "./StyledContainer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import P from "prop-types";

const StyledMyAccount = ({ children }) => {
  const { t } = useTranslation();
  const loggedUserName = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const sideBarElements = [
    {
      text: t("my_profile"),
      to: `/${loggedUserName}/info`,
    },
    {
      text: t("my_data"),
      to: `/${loggedUserName}/info/mydata`,
    },
    {
      text: t("sales"),
      to: `/product/?tags=lifestyle&sell=true`,
    },
    {
      text: t("purchases"),
      onClick: () => navigate("/"),
    },
    { text: t("products"), onClick: () => navigate("/") },
    { text: t("email_short"), onClick: () => navigate("/") },
    {
      text: t("whishlist"),
      to: `/${loggedUserName}/whishlist`,
    },
    { text: t("reserved"), onClick: () => navigate("/") },
    { text: t("chat"), to: `/${loggedUserName}/chat` },
  ];

  return (
    <>
      <TagsNav
        options={sideBarElements}
        $FlexDirection="column"
        $CustomWidth="13.5%"
        $CustomGap="20px"
      ></TagsNav>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default StyledMyAccount;

StyledMyAccount.propTypes = {
  children: P.node,
};

// //Responsive
// const StyledMyAccountContainer = styled.div`
//   display: flex;
//   flex-direction: row;

//   // Responsive Styles
//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

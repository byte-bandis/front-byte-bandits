import TagsNav from "./TagsNav";
import StyledContainer from "./StyledContainer";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import P from "prop-types";

const StyledMyAccount = ({ children }) => {
  const loggedUserName = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const sideBarElements = [
    {
      text: "My Profile",
      to: `/${loggedUserName}/info`,
    },
    {
      text: "My Data",
      to: `/${loggedUserName}/info/mydata`,
    },
    {
      text: "Sell",
      to: `/product/?tags=lifestyle&sell=true`,
    },
    {
      text: "Buy",
      onClick: () => navigate("/"),
    },
    { text: "Products", onClick: () => navigate("/") },
    { text: "Email", onClick: () => navigate("/") },
    {
      text: "WishList",
      to: `/${loggedUserName}/whishlist`,
    },
    {
      text: "Chat",
      to: `/${loggedUserName}/chat`,
    },
    { text: "Reserved", onClick: () => navigate("/") },
    { text: "Others", onClick: () => navigate("/") },
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

StyledMyAccount.propTypes = {
  children: P.node,
};

export default StyledMyAccount;

// //Responsive
// const StyledMyAccountContainer = styled.div`
//   display: flex;
//   flex-direction: row;

//   // Responsive Styles
//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

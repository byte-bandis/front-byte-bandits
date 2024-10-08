import TagsNav from "./TagsNav";
import StyledContainer from "./StyledContainer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLoggedUserName } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import P from "prop-types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTransactions } from "../../store/transactionsThunk";

const StyledMyAccount = ({ children }) => {
  const { t } = useTranslation();
  const loggedUserName = useSelector(getLoggedUserName);
  const navigate = useNavigate();
  const ordersReceived = useSelector(
    (state) => state.transactions.transactionsByUser,
  );
  const dispatch = useDispatch();
  const [sideBarElements, setSideBarElements] = useState([]);

  useEffect(() => {
    if (loggedUserName) {
      dispatch(getTransactions());
    }
  }, [loggedUserName, dispatch]);

  useEffect(() => {
    const updatedElements = [
      {
        text:
          ordersReceived.length > 0 ? (
            <HighlightReserved highlight={true}>
              {t("reserved")}
            </HighlightReserved>
          ) : (
            t("reserved")
          ),
        to: `/${loggedUserName}/reservedProducts`,
      },
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
        to: `/${loggedUserName}/soldProducts`,
      },
      {
        text: t("purchases"),
        to: `/${loggedUserName}/purchasedProducts`,
      },
      {
        text: t("whishlist"),
        to: `/${loggedUserName}/whishlist`,
      },
      { text: t("chat"), to: `/${loggedUserName}/chat` },
      {
        text: t("safety"),
        to: `/${loggedUserName}/safety`,
      },
    ];

    setSideBarElements(updatedElements);
  }, [ordersReceived, loggedUserName, t, navigate]);

  return (
    <StyledContainer
      $customDisplay="flex"
      $customFlexDirection="row"
      $customJustifyContent="flex-start"
      $customGap="3%"
      $customAlignItems="flex-start"
      $customBackground="var(--bg-100)"
      $customMargin="1% 1% 0 1%"
    >
      <TagsNav
        options={sideBarElements}
        $FlexDirection="column"
        $CustomWidth="13.5%"
        $CustomGap="20px"
        $CustomMargin="1rem"
      ></TagsNav>
      <StyledContainer $customBackground="var(-bg-100)">
        {children}
      </StyledContainer>
    </StyledContainer>
  );
};

StyledMyAccount.propTypes = {
  children: P.node.isRequired,
};

TagsNav.propTypes = {
  options: P.arrayOf(
    P.shape({
      text: P.oneOfType([P.string, P.node]),
      to: P.string.isRequired,
    }),
  ).isRequired,
};

export default StyledMyAccount;

const HighlightReserved = styled.div`
  background-color: ${(props) =>
    props.highlight ? "var(--primary-300)" : "var(--bg-100"};
  color: ${(props) => (props.highlight ? "white" : "inherit")};
  font-weight: ${(props) => (props.highlight ? "bold" : "normal")};
  border: ${(props) =>
    props.highlight ? "2px solid var(--highlight-border)" : "none"};
  border-radius: 8px;
  padding: 0.5rem;
`;

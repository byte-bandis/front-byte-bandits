import { useDispatch, useSelector } from "react-redux";
import { StyledAdList } from "../../../components/shared/lists";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
import { resetMessage } from "../../../store/uiSlice";
import propTypes from "prop-types";
import "./ProductItem.css";

const ListItems = ({
  $customRows,
  $customMargin,
  $customTop,
  username = "",
  data,
  ItemContiner,
}) => {
  const errorUi = useSelector((state) => state.ui);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetError = () => {
    dispatch(resetMessage());
  };
  return (
    <StyledAdList
      className="ad-list"
      $customMargin={$customMargin}
      $customTop={$customTop}
      $customRows={$customRows}
    >
      {data.length > 0 ? (
        data.map((item) => (
          <ItemContiner
            item={item}
            key={item._id}
          />
        ))
      ) : (
        <p className="no-ad">{t("user_has_no_ads")}</p>
      )}
      {errorUi.state === "error" && errorUi.message && (
        <ErrorMessage
          className="loginPage-error"
          onClick={resetError}
        >
          <h3>{errorUi.message.toUpperCase()}</h3>
        </ErrorMessage>
      )}
    </StyledAdList>
  );
};
ListItems.propTypes = {
  $customMargin: propTypes.string,
  $customTop: propTypes.string,
  $customRows: propTypes.number,
  username: propTypes.string,
  data: propTypes.array.isRequired,
  ItemContiner: propTypes.func.isRequired,
};

export default ListItems;

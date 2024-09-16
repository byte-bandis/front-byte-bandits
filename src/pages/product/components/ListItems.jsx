import { useDispatch, useSelector } from "react-redux";
import { StyledAdList } from "../../../components/shared/lists";
import ErrorMessage from "./ErrorMessage";
import ProductItem from "./ProductItem";
import { useTranslation } from "react-i18next";
import { resetMessage } from "../../../store/uiSlice";
import propTypes from "prop-types";


const ListItems = ({ $customMargin, $customTop, username, adsData }) => {
    const errorUi = useSelector((state) => state.ui);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const resetError = () => {
        dispatch(resetMessage());
      };
    return <StyledAdList
    className="ad-list"
     $customMargin={$customMargin}
     $customTop={$customTop}
   >
             {adsData.length > 0 ? (
       adsData.map((ad) => (

         <ProductItem
           ad={ad}
           key={ad._id}
           adTitle={ad.adTitle}
           adBody={ad.adBody}
           sell={ad.sell}
           price={ad.price}
           photo={ad.photo}
           user={ad.user}
           createdAt={ad.createdAt}
           updatedAt={ad.updatedAt}
           tags={ad.tags || []}
         />
       ))
     ) : (
       <p className="no-ad">{t("user_has_no_ads", { username })}</p>
     )}
     {errorUi.message && (
       <ErrorMessage
         className="loginPage-error"
         onClick={resetError}
       >
         <h3>{errorUi.message.toUpperCase()}</h3>
       </ErrorMessage>
     )}
   </StyledAdList>;
};
ListItems.propTypes = {
 
    $customMargin: propTypes.string,
    $customTop: propTypes.string,
    username: propTypes.string.isRequired,
    adsData: propTypes.array.isRequired,
  };

export default ListItems;

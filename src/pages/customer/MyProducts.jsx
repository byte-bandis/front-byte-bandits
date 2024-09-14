import { useTranslation } from "react-i18next";
import "./Profile.css";
import PropTypes from "prop-types";
import StyledContainer from "../../components/shared/StyledContainer";
import { useParams } from "react-router-dom";
import ProductList from "../product/ProductList";

const MyProducts = ({ className }) => {
  const { t } = useTranslation();
  const { username } = useParams();
  const currentUrl = window.location.href;

  return (
    <>
      <StyledContainer
        className={className}
        $customMargin="0 0 3rem 1rem"
        $customColor="var(--primary-300)"
        $customWidth="90%"
      >
        <h2>{t("product_list_owner", { username })}</h2>
      </StyledContainer>
      <StyledContainer
        className={
          !currentUrl.includes(`${username}/info`) ? "profile-for-visitors" : ""
        }
        $customDisplay="flex"
        $customPadding="2rem"
        $customAlignItems="center"
        $customMargin="0 0 2rem 0"
        $customBorder="1px dotted var(--primary-300)"
        $customBorderRadius="10px"
        $customWidth="80%"
      >
        <ProductList />
      </StyledContainer>
    </>
  );
};

MyProducts.propTypes = {
  className: PropTypes.string,
};
export default MyProducts;

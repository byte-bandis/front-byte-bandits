import { useTranslation } from "react-i18next";
import StyledContainer from "../../components/shared/StyledContainer";
import { useParams } from "react-router-dom";
import ProductList from "../product/ProductList";

const MyProducts = () => {
  const { t } = useTranslation();
  const { username } = useParams();

  return (
    <>
      <StyledContainer $customMargin="2% 5% 0 5%">
        <h3>{t("product_list_owner", { username })}</h3>
      </StyledContainer>
      <StyledContainer $customMargin="0">
        <ProductList />
      </StyledContainer>
    </>
  );
};

export default MyProducts;

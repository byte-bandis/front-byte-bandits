import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import ProductList from "../product/ProductList";
import { useState } from "react";

const SoldProducts = () => {
  const [showSoldProducts, setShowSoldProducts] = useState(true);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders sold and products in sales</StyledH1>
        <ButtonContainer>
          <button onClick={() => setShowSoldProducts(true)}>
            Products to Sell
          </button>
          <button onClick={() => setShowSoldProducts(false)}>
            Sold Products
          </button>
        </ButtonContainer>

        <AdsContainer>
          <ProductList showSoldProducts={showSoldProducts}></ProductList>
        </AdsContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const AdsContainer = styled.div``;

const StyledH1 = styled.h1``;

const ButtonContainer = styled.div``;
const TransactionIdContainer2 = styled.div``;

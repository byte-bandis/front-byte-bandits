import StyledMyAccount from "../../components/shared/StyledMyAccount";
import styled from "styled-components";
import ProductItem from "../product/ProductItem";
import React from "react";
import { useSelector } from "react-redux";

const SoldProducts = () => {
  const ordersSold = useSelector((state) => state.transactions.ordersSold);
  const adsToSell = useSelector((state) => state.adsSlice);
  console.log("sold", ordersSold);
  console.log("sell", adsToSell);

  return (
    <>
      <StyledMyAccount>
        <StyledH1>Orders sold and products in sales</StyledH1>
        <OrdersSoldContainer>
          {ordersSold.length > 0 ? (
            ordersSold.map((transaction, index) => (
              <React.Fragment key={index}>
                <TransactionIdContainer>{index + 1}</TransactionIdContainer>
                <TransactionIdContainer2>
                  {transaction._id}
                </TransactionIdContainer2>
                <ProductItem ad={transaction.ad} />
              </React.Fragment>
            ))
          ) : (
            <p>There is no products sold</p>
          )}
        </OrdersSoldContainer>
      </StyledMyAccount>
    </>
  );
};
export default SoldProducts;

const OrdersSoldContainer = styled.div``;

const StyledH1 = styled.h1``;

const TransactionIdContainer = styled.div``;
const TransactionIdContainer2 = styled.div``;

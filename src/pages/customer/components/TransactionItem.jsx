import PropTypes from "prop-types";
import styled from "styled-components";
import noImage from "../../../assets/images/no-image.jpg";
import { useTranslation } from "react-i18next";

const TransactionItem = ({ item, $customTransform, $customMargin }) => {
  const { t } = useTranslation();

  const {_id, buyer, ad, price,createdAt } = item;
  const origin = import.meta.env.VITE_API_BASE_URL;

  const image = ad.photo ? ad.photo : noImage;
  
  
  
  

  return (
    <ReducirContainer
      $customMargin={$customMargin}
      $customTransform={$customTransform}
    >
      

      <div className="add" key={_id} to={`/product/${ad._id}`}>
        <StyledSingleAd className={`single-ad ${ad.sell ? "" : "buyitem"}`}>
          <div className="img-container">
            {ad.photo ? (
              <img
                src={image}
                alt={"Imagen de " + ad.adTitle}
                crossOrigin={origin}
              />
            ) : (
              <img className="noImg" src={image} alt="Articulo sin foto" />
            )}
          </div>

          <div className="textcontainer">
            <strong className="">{price} €</strong>
            <p className="item">{ad.adTitle}</p>
            <p className={`pill sell`}>
              {t("Buyer")}{buyer.username}
            </p>
            <div className="tags-container">
                <div  className="pill">
                  <p className="pill-text">{createdAt}</p>
                </div>
            </div>
          </div>
        </StyledSingleAd>
      </div>
    </ReducirContainer>
  );
};

TransactionItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    buyer: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      mobilePhoneNumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }),
    ad: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      adTitle: PropTypes.string.isRequired,
      adBody: PropTypes.string.isRequired,
      sell: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
      photo: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      user: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,

  }),
    state: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
  }),
  $customTransform: PropTypes.string,
  $customMargin: PropTypes.string,
};


export default TransactionItem;
const StyledSingleAd = styled.div`
  box-shadow: 0px 0px 1px 1px var(--shadow-1);
  display: flex;
  flex-direction: ${(props) => props.$customFlexDirection || "column"};
  overflow: hidden;
  width: ${(props) => props.$customWidth || "100%"};
aspect-ratio: 0.8;
  max-width: ${(props) => props.$customMaxWidth || "280px"};
  max-height: ${(props) => props.$customMaxHeight || "100%"};
  gap: ${(props) => props.$customGap || "4px"};
  transition: 0.09s;
  border-radius: 10px;
  padding-bottom: 10px;
  position: relative;
&.buyitem {
    color: var(--botton-2);
    background: var( --primary-100);
  }
  background: var(--bg-200);
  
  & .count {
    top: 4px;
    left: 30px;
    color: "var(--accent-100)"
    font-size: 20px;
    font-weight: bold;
  }
  & .item {
    margin: 0;
    color: var(--text-100);
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .img-container {
    position: relative;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    aspect-ratio: 0.9;
    justify-content: center;
    align-items: center;
    background: var(--bg-100);
    overflow: hidden;
    &:has(.noImg) img {
      
      object-fit: cover;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .noImg {
      opacity: 0.6;
    }
  }
  & .textcontainer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 10px;
    padding-right: 10px;
  }

  & strong {
    font-size: large;
    color: var(--text-100);
  }
  & .pill {
    text-align: center;
    padding: 1px 4px;
    border-radius: 10px;
    color: var(--tag-2);
    height: fit-content;
    background: var(--accent-100);
    gap: 4px;

    & .pill-text {
      color: var(--tag-2);
      font-size: 12px;
      font-weight: bold;
      padding: 0px 4px;
      margin: 0;
    }
  }
  & .tags-container {
    display: flex;
    overflow: hidden;
    height: fit-content;
    gap: 4px;
  }
  & .sell {
    color: var(--bg-100);
    background: var( --primary-200);
  }
  & .buy {
    color: var(--bg-100);
    background: var( --primary-300);
  }
  &:hover {
    transform: scale(1.01);
  }
`;

const ReducirContainer = styled.div`
  margin: ${(props) => props.$customMargin || "0px"};
  transform: ${(props) => props.$customTransform || "scale(1.0)"};
  position: relative;
  .likeContinerDisplay {
    background: var(--bg-100-alpha);
    border-radius: 1px 5px 5px 1px;
    border: 1px dotted var(--shadow-1);
    width: fit-content;
    padding: 3px 3px 3px 12px;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 7px;
    left: -4px;
    color: var(--text-1);
    z-index: 10;
    gap: 5px;
    h6 {
      margin: 0;
      font-weight: bold;
      font-size: 14px;
    }
    & .heart {
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  & .heartbutton {
    cursor: auto;
  }
  width: 100%;
`;

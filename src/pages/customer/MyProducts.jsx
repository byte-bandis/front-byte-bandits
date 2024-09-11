import { useTranslation } from "react-i18next";
import StyledContainer from "../../components/shared/StyledContainer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdsSelector } from "../../store/selectors";
import { StyledAdList } from "../../components/shared/lists";
import ProductItem from "../product/ProductItem";
import { useState } from "react";
import { useEffect } from "react";

const MyProducts = () => {
  const { t } = useTranslation();
  const { username } = useParams();
  const ads = useSelector(getAdsSelector);
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    if (ads) {
      setMyAds(ads.filter((item) => item.user.username === username));
    }
  }, [ads, username]);

  return (
    <>
      <StyledContainer $customMargin="2% 5% 0 5%">
        <h3>{`Los productos de ${username}`}</h3>
      </StyledContainer>
      <StyledContainer $customMargin="0">
        <StyledAdList className="ad-list">
          {myAds.length > 0 ? (
            myAds.map((ad) => (
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
                /* $customMargin="1%" */
              />
            ))
          ) : (
            <p className="no-ad">{t("user_has_no_ads", { username })}</p>
          )}
        </StyledAdList>
      </StyledContainer>
    </>
  );
};

export default MyProducts;

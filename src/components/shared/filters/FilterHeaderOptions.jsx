import DropdownStyled from "../DropdownStyled";
import PriceRangeSelect from "./PriceRangeSelect";
import { useState, useEffect } from "react";
import styled from "styled-components";
import OptionsSelector from "./OptionsSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAds } from "../../../store/adsThunk";
import { setFilters } from "../../../store/adsSlice";
import P from "prop-types";
import { RegularButton } from "../buttons";
import { useTranslation } from "react-i18next";
import { setPage } from "../../../store/adsSlice";

const FilterHeaderOptions = ({ minValue, maxValue, min, max }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState({
    minPrice: minValue || min,
    maxPrice: maxValue !== undefined ? maxValue : max,
  });
  const [sell, setSell] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedOrderPrice, setSelectedOrderPrice] = useState(null);
  const [selectedOrderName, setSelectedOrderName] = useState(null);
  const [selectedOrderDate, setSelectedOrderDate] = useState(null);

  useEffect(() => {
    setPriceRange({
      minPrice: minValue !== undefined ? minValue : min,
      maxPrice: maxValue !== undefined ? maxValue : max,
    });
  }, [minValue, maxValue, min, max]);

  const handleSellChange = (value) => {
    setSell(value === "true" ? true : value === "false" ? false : null);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prevValues) => ({
      ...prevValues,
      [type]: Number(value),
    }));
  };

  const handleTagChange = (tag) => {
    if (tag === null) {
      setTags([]);
    } else {
      setTags((prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag)
          : [...prevTags, tag],
      );
    }
  };

  const handleSortChange = (setOrderFn) => (value) => {
    setOrderFn(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams(window.location.search);
    const adTitle = queryParams.get("adTitle");

    const filters = {
      adTitle: adTitle || "",
      sell: sell !== null ? sell.toString() : null,
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    };

    queryParams.delete("sort");

    if (selectedOrderPrice !== null)
      queryParams.append("sort", selectedOrderPrice);
    if (selectedOrderName !== null)
      queryParams.append("sort", selectedOrderName);
    if (selectedOrderDate !== null)
      queryParams.append("sort", selectedOrderDate);

    queryParams.delete("tags");

    tags.forEach((tag) => queryParams.append("tags", tag));

    // Añadir los filtros restantes
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== "") {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });

    // Actualizar la URL con los nuevos parámetros
    navigate({
      pathname: "/",
      search: `?${queryParams.toString()}`,
      replace: true,
    });

    dispatch(setFilters(filters));
    dispatch(getAds({ page: 1, filters }));
  };

  const handleClear = () => {
    setSell(null);
    setPriceRange({
      minPrice: minValue || min,
      maxPrice: maxValue !== undefined ? maxValue : max,
    });
    setTags([]);
    setSelectedOrderPrice(null);
    setSelectedOrderName(null);
    setSelectedOrderDate(null);
    dispatch(setPage(1));

    const queryParams = new URLSearchParams(window.location.search);

    queryParams.delete("sell");
    queryParams.delete("minPrice");
    queryParams.delete("maxPrice");
    queryParams.delete("tags");
    queryParams.delete("sort");

    navigate({
      pathname: "/",
      search: `?${queryParams.toString()}`,
      replace: true,
    });
    dispatch(setPage(1));
    dispatch(setFilters({}));
  };

  const TAG_OPTIONS = [
    { value: "lifestyle", label: t("Lifestyle") },
    { value: "mobile", label: t("Mobile") },
    { value: "motor", label: t("Motor") },
    { value: "work", label: t("Work") },
    { value: "others", label: t("Others") },
  ];

  return (
    <StyledContainer>
      <DropdownStyled label={t("Sell")}>
        <OptionsSelector
          options={[
            { value: null, label: t("All") },
            { value: "false", label: t("Buy") },
            { value: "true", label: t("Sell") },
          ]}
          selectedTags={sell !== null ? [sell.toString()] : []}
          handleTagChange={handleSellChange}
          type="radio"
        />
      </DropdownStyled>

      <DropdownStyled label={t("Price Range")}>
        <PriceRangeSelect
          min={min}
          max={max}
          minValue={priceRange.minPrice}
          maxValue={priceRange.maxPrice}
          onPriceChange={handlePriceChange}
        />
      </DropdownStyled>

      <DropdownStyled label={t("Tags")}>
        <OptionsSelector
          options={TAG_OPTIONS}
          selectedTags={tags}
          handleTagChange={handleTagChange}
          type="checkbox"
        />
      </DropdownStyled>

      <DropdownStyled label={t("Price Order")}>
        <OptionsSelector
          options={[
            { value: null, label: t("None") },
            { value: "price", label: t("Lowest price") },
            { value: "-price", label: t("Highest price") },
          ]}
          selectedTags={[selectedOrderPrice]}
          handleTagChange={handleSortChange(setSelectedOrderPrice)}
          type="radio"
        />
      </DropdownStyled>

      <DropdownStyled label={t("Name Order")}>
        <OptionsSelector
          options={[
            { value: null, label: t("None") },
            { value: "adTitle", label: t("A-Z") },
            { value: "-adTitle", label: t("Z-A") },
          ]}
          selectedTags={[selectedOrderName]}
          handleTagChange={handleSortChange(setSelectedOrderName)}
          type="radio"
        />
      </DropdownStyled>

      <DropdownStyled label={t("Date Order")}>
        <OptionsSelector
          options={[
            { value: null, label: t("None") },
            { value: "-createdAt", label: t("Newest ads") },
            { value: "createdAt", label: t("Oldest ads") },
          ]}
          selectedTags={[selectedOrderDate]}
          handleTagChange={handleSortChange(setSelectedOrderDate)}
          type="radio"
        />
      </DropdownStyled>

      <RegularButton
        $customBackground="var(--accent-100)"
        $customHoverBackgroundColor="var(--accent-200)"
        onClick={handleClear}
      >
        Clear
      </RegularButton>
      <RegularButton onClick={handleSearch}>Search</RegularButton>
    </StyledContainer>
  );
};

FilterHeaderOptions.propTypes = {
  minValue: P.number,
  maxValue: P.number,
  min: P.number,
  max: P.number,
};

export default FilterHeaderOptions;

const StyledContainer = styled.div`
  display: flex;
  gap: 30px;
`;

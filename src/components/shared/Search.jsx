import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import P from "prop-types";
import Form from "react-bootstrap/Form";
import RegularButton from "./buttons/RegularButton";
import SwitchOptionSelect from "./SwitchOptionSelect";
import TagsOptionsSelect from "./TagsOptionsSelect";
import { useDispatch } from "react-redux";
import PriceRangeSelect from "./PriceRangeSelect";
import SearchByName from "./SearchByName";
import { getAds } from "../../store/adsThunk";
import { setFilters } from "../../store/adsSlice";
import StyledSelect from "./StyledSelect";

const Search = ({ maxPrice, minPrice, onSearch, onClear }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [adTitle, setAdTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [sell, setSell] = useState(true);
  const [price, setPrice] = useState({
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 0,
  });
  const [order, setOrder] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters = {};

    for (let [key, value] of searchParams.entries()) {
      filters[key] = value;
    }

    dispatch(setFilters(filters));
    dispatch(getAds({ page: 1, filters }));
  }, [location.search, dispatch]);
  const handleFilterAdsByName = (event) => {
    console.log("handleFilterAdsByName called with: ", event.target.value);
    setAdTitle(event.target.value);
    if (event.target.value) {
      onSearch();
    }
  };

  const handleSwitchChange = () => {
    setSell((prevSell) => !prevSell);
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setPrice({
      minPrice: minPrice !== undefined ? minPrice : 0,
      maxPrice: maxPrice !== undefined ? maxPrice : 0,
    });
  };

  const handleTagChange = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  const orderOptions = [
    {
      value: "date",
      label: "date",
    },
    {
      value: "price",
      label: "price",
    },
    { value: "name", label: "name" },
  ];

  const handleSearch = (event) => {
    if (event) event.preventDefault();

    const filters = {
      adTitle,
      tags: tags.join(","),
      sell,
      minPrice: price.minPrice,
      maxPrice: price.maxPrice,
    };

    const queryParams = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(typeof value === "number" && value === 0)
      ) {
        queryParams.append(key, value);
      }
    });

    navigate({
      pathname: "/",
      search: `?${queryParams.toString()}`,
    });

    dispatch(setFilters(filters));
    dispatch(getAds({ page: 1, filters }));
  };

  const handleClear = () => {
    setAdTitle("");
    setTags([]);
    setSell(false);
    setPrice({
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    });
    setOrder("");
    navigate("/");
    dispatch(setFilters({}));
    dispatch(getAds());
    onClear();
  };

  return (
    <>
      <div>
        {" "}
        <SearchByName
          onChange={handleFilterAdsByName}
          value={adTitle}
          onEnter={handleSearch}
        />
        {adTitle && (
          <RegularButton
            onClick={handleClear}
            $customBackground="var(--accent-100)"
            $customColor="white"
            $customHoverBackgroundColor="var(--accent-200)"
            $customHoverColor="white"
            $customBorder="none"
            $customMargin="0 0 0 10px"
          >
            X
          </RegularButton>
        )}
      </div>

      <SwitchOptionSelect sell={sell} handleSwitchChange={handleSwitchChange}>
        Status:
      </SwitchOptionSelect>

      <Form.Label>Price:</Form.Label>
      <PriceRangeSelect
        min={minPrice}
        max={maxPrice}
        onPriceChange={handlePriceChange}
        minValue={price.minPrice}
        maxValue={price.maxPrice}
      />

      <TagsOptionsSelect
        text="Tags:"
        tags={tags}
        handleTagChange={handleTagChange}
        value={tags}
      />
      <StyledSelect
        options={orderOptions}
        text="Order by: "
        handleOrder={handleOrder}
        ariaLabel="default selection"
      />
    </>
  );
};

Search.propTypes = {
  minPrice: P.number,
  maxPrice: P.number,
  onSearch: P.func.isRequired,
  onClear: P.func.isRequired,
};

export default Search;

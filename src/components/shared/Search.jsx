import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import P from "prop-types";
import RegularButton from "./buttons/RegularButton";
import { useDispatch } from "react-redux";
import SearchByName from "./SearchByName";
import { getAds } from "../../store/adsThunk";
import { setFilters } from "../../store/adsSlice";
import styled from "styled-components";

const Search = ({ onSearch, onClear }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [adTitle, setAdTitle] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const adTitleParams = searchParams.get("adTitle");
    setAdTitle(adTitleParams);

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

  const handleSearch = (event) => {
    if (event) event.preventDefault();

    const filters = {
      adTitle,
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

    navigate("/");
    dispatch(setFilters({}));
    dispatch(getAds());
    onClear();
  };

  return (
    <>
      <SearchContainer>
        {" "}
        <SearchByName
          onChange={handleFilterAdsByName}
          value={adTitle}
          onEnter={handleSearch}
          customWidth="220%"
        />
        {adTitle && (
          <RegularButton
            onClick={handleClear}
            $customBackground="var(--accent-100)"
            $customColor="white"
            $customHoverBackgroundColor="var(--accent-200)"
            $customHoverColor="white"
            $customBorder="none"
            $customMargin="19px 40px 0 -90px"
          >
            X
          </RegularButton>
        )}
      </SearchContainer>
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

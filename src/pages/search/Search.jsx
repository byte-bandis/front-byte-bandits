import { useState } from "react";
import { useNavigate } from "react-router-dom";
import P from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Accordion } from "react-bootstrap";
import styles from "./Search.module.css";
import CustomButton from "../../components/shared/CustomButton";
import SwitchOptionSelect from "../../components/shared/SwitchOptionSelect";
import TagsOptionsSelect from "../../components/shared/TagsOptionsSelect";
import { useSelector, useDispatch } from "react-redux";
import PriceRangeSelect from "../../components/shared/PriceRangeSelect";
import SearchByName from "../../components/shared/SearchByName";
import { getAds } from "../../store/adsThunk";
import { setFilters } from "../../store/adsSlice";

console.log(setFilters());

const Search = ({ maxPrice, minPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adsData = useSelector((state) => state.adsState.data);
  const [expanded, setExpanded] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isBuy, setIsBuy] = useState(null);
  const [priceRange, setPriceRange] = useState({
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 0,
  });
  // const [filteredAds, setFilteredAds] = useState(adsData);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // const filterAdsByCriteria = (
  //   ads,
  //   { filterName, selectedTags, isBuy, priceRange },
  // ) => {
  //   return ads.filter((ad) => {
  //     const filterByName =
  //       !filterName ||
  //       ad.adTitle.toLowerCase().includes(filterName.toLowerCase());
  //     const filterByTags =
  //       selectedTags.length === 0 ||
  //       selectedTags.some((tag) => ad.tags.includes(tag));
  //     const filterByStatus = isBuy === null || ad.isBuy === isBuy;
  //     const filterByPrice =
  //       (priceRange.minPrice === 0 || ad.price >= priceRange.minPrice) &&
  //       (priceRange.maxPrice === 0 || ad.price <= priceRange.maxPrice);

  //     console.log(priceRange.minPrice);
  //     console.log(
  //       `filterByName: ${filterByName}, selectByTags: ${filterByTags}, filterByStatus: ${filterByStatus}, filterByPrice: ${filterByPrice}`,
  //     );

  //     return filterByName && filterByTags && filterByStatus && filterByPrice;
  //   });
  // };

  const handleFilterAdsByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSwitchChange = () => {
    setIsBuy((prevIsBuy) =>
      prevIsBuy === null ? true : prevIsBuy === true ? false : null,
    );
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setPriceRange({
      minPrice: minPrice !== undefined ? minPrice : 0,
      maxPrice: maxPrice !== undefined ? maxPrice : 0,
    });
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const filters = {
      filterName,
      selectedTags: selectedTags.join(","),
      isBuy,
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
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

    console.log("Filters being dispatched", filters);
    dispatch(setFilters(filters));
    dispatch(getAds({ page: 1, filters }));
    // const filtered = filterAdsByCriteria(adsData, {
    //   filterName,
    //   priceRange,
    //   selectedTags,
    //   isBuy,
    // });
    // setFilteredAds(filtered);
  };

  const handledeleteSearch = () => {
    setFilterName("");
    setSelectedTags([]);
    setIsBuy(null);
    setPriceRange({
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    });
    navigate("/");
    // setFilteredAds(adsData);
    dispatch(setFilters({}));
    dispatch(getAds());
  };

  console.log(adsData);
  console.log(selectedTags);
  console.log(isBuy);
  console.log(priceRange);
  // console.log(filteredAds);

  return (
    <Container
      className={`${styles.searchWrapper} ${expanded ? styles.expanded : ""}`}
    >
      <Accordion className="py-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={toggleExpanded}>Search</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row className="d-flex flex-wrap justify-content-between align-items-center">
                <Col xs={12} md={6}>
                  <SearchByName
                    className={styles.nameSelection}
                    onChange={handleFilterAdsByName}
                    autoComplete="Product name"
                    value={filterName}
                  >
                    Product name
                  </SearchByName>
                </Col>
                <Col xs={12} md={6}>
                  <SwitchOptionSelect
                    className={styles.sellSwitch}
                    isBuy={isBuy}
                    handleSwitchChange={handleSwitchChange}
                    value={isBuy}
                  >
                    Status
                  </SwitchOptionSelect>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Price</Form.Label>
                  <PriceRangeSelect
                    className={styles.priceSelector}
                    min={minPrice}
                    max={maxPrice}
                    onPriceChange={handlePriceChange}
                    minValue={priceRange.minPrice}
                    maxValue={priceRange.maxPrice}
                  />
                </Col>
                <Col>
                  <TagsOptionsSelect
                    selectedTags={selectedTags}
                    handleTagChange={handleTagChange}
                    value={selectedTags}
                  />
                  <CustomButton
                    className={styles.deleteSearch}
                    onClick={handledeleteSearch}
                  >
                    Delete search
                  </CustomButton>
                  <CustomButton
                    className={styles.Search}
                    onClick={handleSearch}
                  >
                    Search
                  </CustomButton>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

Search.propTypes = {
  handleFilterAdsByName: P.func,
  handleSwitchChange: P.func,
  handlePriceChange: P.func,
  handleTagChange: P.func,
  minPrice: P.number,
  maxPrice: P.number,
};

export default Search;

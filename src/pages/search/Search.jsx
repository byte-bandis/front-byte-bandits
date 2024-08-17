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
  const [adsTitle, setAdsTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [sell, setSell] = useState(null);
  const [price, setPrice] = useState({
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 0,
  });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleFilterAdsByName = (event) => {
    setAdsTitle(event.target.value);
  };

  const handleSwitchChange = () => {
    setSell((prevSell) =>
      prevSell === null ? true : prevSell === true ? false : null,
    );
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

  const handleSearch = (event) => {
    event.preventDefault();

    const filters = {
      adsTitle: adsTitle,
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

    console.log("Filters being dispatched", filters);
    dispatch(setFilters(filters));
    dispatch(getAds({ page: 1, filters }));
  };

  const handledeleteSearch = () => {
    setAdsTitle("");
    setTags([]);
    setSell(null);
    setPrice({
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    });
    navigate("/");
    // setFilteredAds(adsData);
    dispatch(setFilters({}));
    dispatch(getAds());
  };

  console.log(adsData);
  console.log(tags);
  console.log(sell);
  console.log(price);

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
                    value={adsTitle}
                  >
                    Product name
                  </SearchByName>
                </Col>
                <Col xs={12} md={6}>
                  <SwitchOptionSelect
                    className={styles.sellSwitch}
                    sell={sell}
                    handleSwitchChange={handleSwitchChange}
                    value={sell}
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
                    minValue={price.minPrice}
                    maxValue={price.maxPrice}
                  />
                </Col>
                <Col>
                  <TagsOptionsSelect
                    tags={tags}
                    handleTagChange={handleTagChange}
                    value={tags}
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

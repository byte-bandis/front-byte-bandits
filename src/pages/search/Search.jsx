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
import { useDispatch } from "react-redux";
import PriceRangeSelect from "../../components/shared/PriceRangeSelect";
import SearchByName from "../../components/shared/SearchByName";
import { getAds } from "../../store/adsThunk";
import { setFilters } from "../../store/adsSlice";

const Search = ({ maxPrice, minPrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [adTitle, setAdTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [sell, setSell] = useState(true);
  const [price, setPrice] = useState({
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 0,
  });

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleFilterAdsByName = (event) => {
    setAdTitle(event.target.value);
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

  const handleSearch = (event) => {
    event.preventDefault();

    const filters = {
      adTitle: adTitle,
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
    dispatch(setExpanded(false));
  };

  const handledeleteSearch = () => {
    setAdTitle("");
    setTags([]);
    setSell(false);
    setPrice({
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
    });
    navigate("/");
    dispatch(setFilters({}));
    dispatch(getAds());
    dispatch(setExpanded(true));
  };

  return (
    <Container
      className={`${styles.searchWrapper} ${expanded ? styles.expanded : ""}`}
    >
      <Accordion className="py-3" activeKey={expanded ? "0" : null}>
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
                    value={adTitle}
                  >
                    Product name:
                  </SearchByName>
                </Col>
                <Col xs={12} md={6}>
                  <SwitchOptionSelect
                    className={styles.sellSwitch}
                    sell={sell}
                    handleSwitchChange={handleSwitchChange}
                  >
                    Status:
                  </SwitchOptionSelect>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Price:</Form.Label>
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
                  <div className={styles.buttonsSearch}>
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
                  </div>
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

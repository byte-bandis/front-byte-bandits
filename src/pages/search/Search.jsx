import { useState } from "react";
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
import { useSelector } from "react-redux";
import PriceRangeSelect from "../../components/shared/PriceRangeSelect";
import SearchByName from "../../components/shared/SearchByName";

const Search = ({
  handleFilterAdsByName,
  handleSwitchChange,
  handleTagChange,
  handlePriceChange,
  maxPrice,
  minPrice,
}) => {
  const adsData = useSelector((state) => state.adsState.data);
  const [expanded, setExpanded] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isBuy, setIsBuy] = useState(null); // Inicialmente null para que no se aplique por defecto
  const [priceRange, setPriceRange] = useState({
    minPrice: minPrice || 0,
    maxPrice: maxPrice || 9999999999999,
  });
  const [filteredAds, setFilteredAds] = useState(adsData);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const filterAdsByCriteria = (
    ads,
    { filterName, selectedTags, isBuy, priceRange },
  ) => {
    return ads.filter((ad) => {
      const filterByName =
        !filterName ||
        ad.adTitle.toLowerCase().includes(filterName.toLowerCase());
      const filterByTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => ad.tags.includes(tag));
      const filterByStatus = isBuy === null || ad.isBuy === isBuy;
      const filterByPrice =
        ad.price >= priceRange.minPrice && ad.price <= priceRange.maxPrice;

      console.log(
        `filterByName: ${filterByName}, selectByTags: ${filterByTags}, filterByStatus: ${filterByStatus}, filterByPrice: ${filterByPrice}`,
      );

      return filterByName && filterByTags && filterByStatus && filterByPrice;
    });
  };

  handleFilterAdsByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSwitchChangeInternal = () => {
    setIsBuy((prevIsBuy) =>
      prevIsBuy === null ? true : prevIsBuy === true ? false : null,
    );
  };

  const handlePriceChangeInternal = (minPrice, maxPrice) => {
    setPriceRange({ minPrice, maxPrice });
  };

  const handleTagChangeInternal = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleSearch = () => {
    const filtered = filterAdsByCriteria(adsData, {
      filterName,
      priceRange,
      selectedTags,
      isBuy,
    });
    setFilteredAds(filtered);
  };

  console.log(adsData);
  console.log(selectedTags);
  console.log(isBuy);
  console.log(priceRange);
  console.log(filteredAds);

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
                  >
                    Product name
                  </SearchByName>
                </Col>
                <Col xs={12} md={6}>
                  <SwitchOptionSelect
                    className={styles.sellSwitch}
                    isBuy={isBuy}
                    handleSwitchChange={handleSwitchChangeInternal}
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
                    onPriceChange={handlePriceChangeInternal}
                  />
                </Col>
                <Col>
                  <TagsOptionsSelect
                    selectedTags={selectedTags}
                    handleTagChange={handleTagChangeInternal}
                  />
                  <CustomButton onClick={handleSearch}>Search</CustomButton>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Aquí podrías mostrar los anuncios filtrados */}
      <div>
        {filteredAds.map((ad) => (
          <div key={ad.id}>
            <h3>{ad.adTitle}</h3>
            <p>{ad.adDescription}</p>
            {/* Muestra otros detalles del anuncio aquí */}
          </div>
        ))}
      </div>
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

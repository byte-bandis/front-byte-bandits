import { useState } from "react";
import P from "prop-types";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import MultiSelect from "../../components/form/MuliSelect";
import MultiRangeSlider from "multi-range-slider-react";
import { Accordion } from "react-bootstrap";
import styles from "./Search.module.css";

const Search = ({
  onSearch,
  onSale,
  onPrice,
  maxPrice,
  minPrice,
  max,
  OnOptionsChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
                  <Form.Label htmlFor="name">Product Name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    onChange={onSearch}
                    autoComplete="Product name"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label htmlFor="sale">Status</Form.Label>
                  <Form.Check id="sale" name="sale" onChange={onSale}>
                    <option value="0">Buy</option>
                    <option value="1">Sell</option>
                  </Form.Check>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Label>Price</Form.Label>
                  <MultiRangeSlider
                    min={0}
                    max={max}
                    step={50}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onInput={onPrice}
                  />
                </Col>
                <Col>
                  <MultiSelect handleOptions={OnOptionsChange}></MultiSelect>
                  <small className="fs-6">Ctrl + click to multiselect</small>
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
  onSearch: P.func.isRequired,
  onSale: P.func.isRequired,
  onPrice: P.func.isRequired,
  maxPrice: P.number,
  minPrice: P.number.isRequired,
  max: P.number,
  valueName: P.string,
  OnOptionsChange: P.func.isRequired,
};

export default Search;

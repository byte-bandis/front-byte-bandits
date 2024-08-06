import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./search.module.css";

const Search = () => {
  return (
    <>
      <Form className={styles.searchRow}>
        <Form.Control
          type="search"
          placeholder="Search"
          className={styles.barSearch}
          aria-label="Search"
        />
        <Button variant="outline-success" className={styles.buttonSearch}>
          Search
        </Button>
      </Form>
    </>
  );
};

export default Search;

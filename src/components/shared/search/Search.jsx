import Form from "react-bootstrap/Form";
import CustomButton from "react-bootstrap/Button";
import styles from "./search.module.css";

const Search = () => {
  return (
    <>
      <Form className={`d-flex ${styles.rowSearch}`}>
        <Form.Control
          type="search"
          placeholder="Search"
          className={styles.barSearch}
          aria-label="Search"
        />
        <CustomButton variant="outline-success" className={styles.buttonSearch}>
          Search
        </CustomButton>
      </Form>
    </>
  );
};

export default Search;

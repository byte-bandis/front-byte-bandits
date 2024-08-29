import Form from "react-bootstrap/Form";
import RegularButton from "../buttons/RegularButton";
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
        <RegularButton
          variant="outline-success"
          className={styles.buttonSearch}
        >
          Search
        </RegularButton>
      </Form>
    </>
  );
};

export default Search;

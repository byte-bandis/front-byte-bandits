import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../../../../public/ICraftYou.png";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <>
      <Link to="/">
        <Image src={logo} className={styles.logo} />
      </Link>
    </>
  );
};

export default Logo;

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SellBuyButton = () => {
  return (
    <Button
      as={Link}
      to=":username/new"
      variant="success"
      size="lg"
      className="ms-2"
      style={{ borderRadius: "50px" }}
    >
      <span>Vender / Comprar</span>
    </Button>
  );
};

export default SellBuyButton;

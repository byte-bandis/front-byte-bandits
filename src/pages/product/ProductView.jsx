import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import PropTypes from 'prop-types';

const ProductView = () => {
	const image = photo ? `../../assets/images/${photo}` : "../../assets/images/no-image.jpg";

	return (
		<>
			<Container>
				<Row className="d-flex flex-column d-md-flex flex-md-row">
					<Col>
						<Image src={image} alt='default image' fluid />
					</Col>
					<Col>
						<h1>{adTitle}</h1>
						<p>{adBody}</p>
						<p>{price}€</p>
						<Button>{sell ? 'Venta' : 'Compra'} Now </Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};
ProductView.propTypes = {
	_id: PropTypes.string.isRequired,
	adTitle: PropTypes.string.isRequired,
	adBody: PropTypes.string.isRequired,
	sell: PropTypes.bool.isRequired,
	price: PropTypes.number.isRequired,
	photo: PropTypes.string,
	user: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  
  ProductView.defaultProps = {
	photo: 'no-image.jpg',
  };
export default ProductView;

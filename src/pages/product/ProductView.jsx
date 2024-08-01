import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import defaultImage from "../../assets/images/no-image.jpg";
import { Image } from "react-bootstrap";
const ProductView = ({ 
	_id, 
	adTitle, 
	adBody, 
	sell, 
	price, 
	photo,
	tags 
  }) => {
	const image = photo ? `../../assets/images/${photo}` : "../../assets/images/no-image.jpg";

	return (
		<>
			<Container>
				<Row className="d-flex flex-column d-md-flex flex-md-row">
					<Col>
						<Image src={image} alt='default image' fluid />
					</Col>
					<Col>
						<h1>Product View Title</h1>
						<p>Product View Description</p>
						<p>Product View Price</p>
						<Button>Buy Now</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ProductView;

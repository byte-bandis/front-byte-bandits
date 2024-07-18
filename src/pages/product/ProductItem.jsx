import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import defaultImage from "../../assets/images/no-image.jpg";
import { Link } from "react-router-dom";

const ProductItem = () => {
	return (
		<>
			<Col>
				<Card>
					<Link to='/product/1'>
					<Card.Img variant='top' src={defaultImage} />
					</Link>
					<Card.Body>
						<Link to='/product/1'>
						<Card.Title>Card Title</Card.Title>
						</Link>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card content.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
};

export default ProductItem;

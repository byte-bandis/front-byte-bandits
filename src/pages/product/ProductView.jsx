import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import defaultImage from "../../assets/images/no-image.jpg";
import { Image } from "react-bootstrap";
const ProductView = () => {
    return (
			<>
				<Container>
					<Row className='md-d-flex justify-content-md-center'>
						<Col>
							<Image src={defaultImage} alt='default image' fluid />
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
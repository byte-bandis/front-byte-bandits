import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import defaultImage from "../../assets/images/no-image.jpg";
import { Link } from "react-router-dom";
import { Stack, Badge } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

const ProductItem = () => {

	const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];
	const id = 1;
	return (
		<>
			<Col>
				<Card>
					<Link to='/product/1' className="position-relative">
						<Card.Img variant='top' src={defaultImage} />
						<Stack
							direction='horizontal'
							gap={2}
							className='position-absolute top-0 p-2'>
							<Badge pill bg='danger'>
								Sold
							</Badge>
							<Badge pill bg='warning' text='dark'>
								Reserved
							</Badge>
						</Stack>
						<Stack direction="horizontal" gap={2} className='position-absolute bottom-0 p-2'>
							<Heart size={24} className="text-danger"/>
						</Stack>
					</Link>
					<Card.Body>
						<Link to='/product/1'>
							<Card.Title>Card Title</Card.Title>
						</Link>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card content.
						</Card.Text>
						<Card.Text className='d-flex justify-content-between align-items-center'>
							<span className='price'>1200</span>
							<span>Venta</span>
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Stack direction='horizontal' gap={2}>
							{tags.map((tag, index) => (
								<Badge key={`${id}-${index}`} pill bg='primary'>
									{tag}
								</Badge>
							))}
						</Stack>
					</Card.Footer>
				</Card>
			</Col>
		</>
	);
};

export default ProductItem;

import { Col, Container, Row } from "react-bootstrap";
const NotFound = () => {
	return (
		<Container>
			<Row className='justify-content-center'>
				<Col md={8} sm={12}>
					<img src='/not-found.svg' alt='Not Found' />
				</Col>
			</Row>
		</Container>
	);
};

export default NotFound;

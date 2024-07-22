import { Pagination,Row, Col } from "react-bootstrap";

const Pager = () => {
	let active = 2;
	let items = [];
	for (let number = 1; number <= 5; number++) {
		items.push(
			<Pagination.Item key={number} active={number === active}>
				{number}
			</Pagination.Item>
		);
	}
	return (
		<>
			<Row>
				<Col className='d-flex justify-content-center align-items-center p-5'>
					<Pagination>{items}</Pagination>
				</Col>
			</Row>
		</>
	);
};

export default Pager;

import { Pagination,Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/adsSlice";

const Pager = () => {
	const dispatch = useDispatch()
	let active = useSelector((state) => state.adsState.page);

	let items = [];
	for (let number = 1; number <= 5; number++) {
		items.push(
			<Pagination.Item key={number} active={number === active} onClick={() => {dispatch(setPage(number))}}>
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

import { Pagination,Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/adsSlice";
import getTotalAds from "../../store/adscounThunk";

const Pager = () => {
	const dispatch = useDispatch()
	dispatch(getTotalAds()).count;
	const adsAccount = useSelector(state => state.adsState.totalAds)
	console.log(adsAccount)
	let active = useSelector((state) => state.adsState.page);

	let items = [];
	for (let number = 1; number <= Math.ceil(adsAccount/6); number++) {
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

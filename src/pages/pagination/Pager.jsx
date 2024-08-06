import { Pagination, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/adsSlice';
import getTotalAds from '../../store/adscounThunk';
import { useEffect } from 'react';

const Pager = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotalAds());
    }, [dispatch]);
    const adsAccount = useSelector((state) => state.adsState.totalAds);
    let active = useSelector((state) => state.adsState.page);
    const steps = 3;
    const max = Math.ceil(adsAccount / 8);
	console.log(adsAccount / 8)
    let items = [];
    for (let number = 1; number <= max; number++) {
        if (
            number < active - steps - Math.max(steps + active - max, 0) ||
            number > active + steps + Math.max(steps - active + 1, 0)
        )
            continue;
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => {
                    dispatch(setPage(number));
                }}
            >
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

import { Pagination, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../store/adsSlice';
import getTotalAds from '../../store/adscounThunk';
import { useEffect } from 'react';
import {
    CaretLeft,
    CaretLeftFill,
    CaretRight,
    CaretRightFill,
} from 'react-bootstrap-icons';

const Pager = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotalAds());
    }, [dispatch]);
    const adsAccount = useSelector((state) => state.adsState.totalAds);
    let active = useSelector((state) => state.adsState.page);
    const steps = 3;
    const max = Math.ceil(adsAccount / 8);
    let items = [];

    items.push(
        <Pagination.Prev
            onClick={() => {
                {
                    dispatch(setPage(1));
                }
            }}
        >
            <CaretLeftFill />
        </Pagination.Prev>
    );
    items.push(
        <Pagination.Prev
            onClick={() => {
                if (active > 1) {
                    dispatch(setPage(active - 1));
                }
            }}
        >
            <CaretLeft />
        </Pagination.Prev>
    );
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
    items.push(
        <Pagination.Next
        onClick={() => {
            {
                if (active < max) {
                    dispatch(setPage(active + 1));
                }
            }
        }}
        >
            <CaretRight />
        </Pagination.Next>
    );
    items.push(
        <Pagination.Next
            onClick={() => {
                dispatch(setPage(max));
            }}
        >
            <CaretRightFill />
        </Pagination.Next>
    );

    return (
        <>
            <Row>
                <Col className='d-flex justify-content-center align-items-center p-4'>
                    <Pagination>{items}</Pagination>
                </Col>
            </Row>
        </>
    );
};

export default Pager;

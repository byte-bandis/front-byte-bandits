import { Pagination, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/adsSlice";
import getTotalAds from "../../store/adscounThunk";
import { useEffect } from "react";
import {
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";

const Pager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getTotalAds());
  }, [dispatch]);

  const adsAccount = useSelector((state) => state.adsState.totalAds);
  let active = useSelector((state) => state.adsState.page);
  const steps = 3;
  const max = Math.ceil(adsAccount / 8);
  let items = [];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = queryParams.get("page");

    if (currentPage !== String(active)) {
      queryParams.set("page", active);
      navigate({
        pathname: location.pathname,
        search: `?${queryParams.toString()}`,
      });
    }
  }, [active, navigate, location]);

  items.push(
    <Pagination.Prev
      key="initial"
      onClick={() => {
        {
          dispatch(setPage(1));
        }
      }}
    >
      <CaretLeftFill />
    </Pagination.Prev>,
  );
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => {
        if (active > 1) {
          dispatch(setPage(active - 1));
        }
      }}
    >
      <CaretLeft />
    </Pagination.Prev>,
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
      </Pagination.Item>,
    );
  }
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => {
        {
          if (active < max) {
            dispatch(setPage(active + 1));
          }
        }
      }}
    >
      <CaretRight />
    </Pagination.Next>,
  );
  items.push(
    <Pagination.Next
      key="final"
      onClick={() => {
        dispatch(setPage(max));
      }}
    >
      <CaretRightFill />
    </Pagination.Next>,
  );

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center align-items-center p-4">
          <Pagination>{items}</Pagination>
        </Col>
      </Row>
    </>
  );
};

export default Pager;

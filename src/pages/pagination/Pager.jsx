import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../store/adsSlice";
import {
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../product/components/Button";
import styled from "styled-components";

const Pager = (params) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const{adsAccount, limit} =  params;

  let active = useSelector((state) => state.adsState.page);
  const steps = 3;
  const max = Math.ceil(adsAccount / limit);
  let items = [];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = queryParams.get("page");
    const limitAdsPerPage = queryParams.get("limit");

    if (currentPage !== String(active) || limitAdsPerPage !== String(limit)) {
      queryParams.set("page", active);
      queryParams.set("limit", limit);
      navigate({
        pathname: location.pathname,
        search: `?${queryParams.toString()}`,
      });
    }
  }, [active, navigate, location]);

    items.push(
        <Button
            $customBorderRadius='5px 0 0 5px'
            $cLPadding='12px'
            $cRPadding='18px'
            $cBPadding='2px'
            $customheight='40px'
            $customwidth='40px'
            key='initial'
            onClick={() => {
                dispatch(setPage(1));
            }}
        >
            <CaretLeftFill />
        </Button>
    );

  items.push(
    <Button
      $cLPadding="12px"
      $cRPadding="18px"
      $cBPadding="2px"
      $customheight="40px"
      $customwidth="40px"
      key="prev"
      onClick={() => {
        if (active > 1) {
          dispatch(setPage(active - 1));
        }
      }}
    >
      <CaretLeft />
    </Button>
  );

  for (let number = 1; number <= max; number++) {
    if (
      number < active - steps - Math.max(steps + active - max, 0) ||
      number > active + steps + Math.max(steps - active + 1, 0)
    )
      continue;

    items.push(
      <Button
        $cLPadding="15px"
        $cRPadding="15px"
        $customheight="40px"
        $customwidth="40px"
        key={number}
        onClick={() => {
          dispatch(setPage(number));
        }}
        className={number === active && "active"}
      >
        {number}
      </Button>
    );
  }

  items.push(
    <Button
      $cLPadding="12px"
      $cRPadding="18px"
      $cBPadding="2px"
      $customheight="40px"
      $customwidth="40px"
      key="next"
      onClick={() => {
        if (active < max) {
          dispatch(setPage(active + 1));
        }
      }}
    >
      <CaretRight />
    </Button>
  );

    items.push(
        <Button
            $customBorderRadius=' 0 5px 5px 0 '
            $cLPadding='12px'
            $cRPadding='18px'
            $cBPadding='2px'
            $customheight='40px'
            $customwidth='40px'
            key='final'
            onClick={() => {
                dispatch(setPage(max));
            }}
        >
            <CaretRightFill />
        </Button>
    );

  return <Paginator>{items}</Paginator>;
};

const Paginator = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    position: relative;
    top: -10px;
`;

export default Pager;

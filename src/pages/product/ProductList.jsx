import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductItem from './ProductItem';
import Search from '../search/Search';
import Pager from '../pagination/Pager';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import getAds from './service';

const ProductList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAds());
    }, [dispatch]);

    const adsData = useSelector((state) => state.adsState.data);

    return (
        <Container>
            <Row>
                <Search />
            </Row>
            <Row
                xs={1}
                sm={2}
                md={3}
                lg={3}
                role='list'
                className='list-wrapper g-4'
            >
                {adsData && adsData.map(ad => (
                    <ProductItem
                        key={ad._id}
                        adTitle={ad.adTitle}
                        adBody={ad.adBody}
                        sell={ad.sell}
                        price={ad.price}
                        photo={ad.photo}
                        user={ad.user}
                        createdAt={ad.createdAt}
                        updatedAt={ad.updatedAt}
                        tags={ad.tags || []}
                    />
                ))}
            </Row>
            <Row className='d-flex justify-content-center align-items-center p-5'>
                <Pager />
            </Row>
        </Container>
    );
};

export default ProductList;

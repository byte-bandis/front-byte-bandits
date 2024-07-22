import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductItem from "./ProductItem";
import Search from "../search/Search";
import Pager from "../pagination/Pager";
const ProductList = () => {
	return (
		<Container>
			<Row>
				<Search />
			</Row>
			<Row xs={1} sm={2} md={3} lg={3} role='list' className='list-wrapper g-4'>
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
			</Row>
			<Row className="d-flex justify-content-center align-items-center p-5">
				<Pager />
			</Row>
		</Container>
	);
};

export default ProductList;

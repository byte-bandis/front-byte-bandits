import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductItem from "./ProductItem";
const ProductList = () => {
	return (
		<Container>
			<Row xs={1} sm={2} md={3} lg={3} role='list' className='list-wrapper g-4'>
				<ProductItem />
				<ProductItem />
				<ProductItem />
				<ProductItem />
			</Row>
		</Container>
	);
};

export default ProductList;

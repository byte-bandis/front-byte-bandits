import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import getAds from "../../store/adsThunk";



const ProductView = () => {
	const { productId } = useParams();
    const dispatch = useDispatch();
    
    // Seleccionar los anuncios del estado
    const loadedAds = useSelector(state => state.adsState.data).find(onead => onead._id === productId);
    
    // Efecto para cargar el anuncio si no se encuentra en el estado
    useEffect(() => {
        if (!loadedAds) {
            dispatch(getAds(productId)); // Llama a la acción para obtener el anuncio
        }
    }, [loadedAds, productId, dispatch]);

    if (!loadedAds) {
        return <div>Cargando...</div>; // O algún otro indicador de carga
    }

    const { adTitle, adBody, sell, price, photo } = loadedAds;
    const image = photo ? `${photo}` : "../../assets/images/no-image.jpg";
    const origin = import.meta.env.VITE_API_BASE_URL;
	return (
		<>
			<Container>
				<Row className="d-flex flex-column d-md-flex flex-md-row">
					<Col>
						<Image src={image} alt='default image' crossorigin={origin} fluid />
					</Col>
					<Col>
						<h1>{adTitle}</h1>
						<p>{adBody}</p>
						<p>{price}€</p>
						<Button>{sell ? 'Venta' : 'Compra'} Now </Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};
ProductView.propTypes = {
	_id: PropTypes.string.isRequired,
	adTitle: PropTypes.string.isRequired,
	adBody: PropTypes.string.isRequired,
	sell: PropTypes.bool.isRequired,
	price: PropTypes.number.isRequired,
	photo: PropTypes.string,
	user: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  

export default ProductView;

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Stack, Badge } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";
import PropTypes from 'prop-types';

const ProductItem = ({ 
  ad,
}) => {
  const { _id, adTitle, adBody, sell, price, photo, /* user, createdAt, updatedAt, */ tags } = ad
  const image = photo ? `${photo}` : "../../assets/images/no-image.jpg";
	const origin = import.meta.env.VITE_API_BASE_URL

  return (
    <Col>
      <Card>
        <Link to={`/product/${_id}`} className="position-relative">
          <Card.Img variant='top' src={image} crossOrigin={origin}/>
          <Stack
            direction='horizontal'
            gap={2}
            className='position-absolute top-0 p-2'>
            {/* <Badge pill bg='danger'>
              Sold
            </Badge>
            <Badge pill bg='warning' text='dark'>
              Reserved
            </Badge> */}
          </Stack>
          <Stack direction="horizontal" gap={2} className='position-absolute bottom-0 p-2'>
            <Heart size={24} className="text-danger"/>
          </Stack>
        </Link>
        <Card.Body>
          <Link to={`/product/${_id}`}>
            <Card.Title>{adTitle}</Card.Title>
          </Link>
          <Card.Text>
            {adBody}
          </Card.Text>
          <Card.Text className='d-flex justify-content-between align-items-center'>
            <span className='price'>{price}</span>
            <span>{sell ? 'Venta' : 'Compra'}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Stack direction='horizontal' gap={2}>
            {tags.map((tag, index) => (
              <Badge key={`${_id}-${index}`} pill bg='primary'>
                {tag}
              </Badge>
            ))}
          </Stack>
        </Card.Footer>
      </Card>
    </Col>
  );
};

ProductItem.propTypes = {
  ad: PropTypes.shape({
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
  })
  
};



export default ProductItem;

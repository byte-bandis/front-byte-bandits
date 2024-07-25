import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { createProduct } from "../../store/productsAsyncThunk";
import "./NewProduct.css";

const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

const NewProductPage = () => {
  // Estados para los campos del formulario
  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTransactionType, setInputTransactionType] = useState("sell");
  const [selectedTags, setSelectedTags] = useState([]);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validar que al menos un tag sea seleccionado
    if (selectedTags.length === 0) {
      setShow(true);
      return;
    }

    setLoading(true);
    const product = {
      adTitle: inputName,
      photo: inputImage,
      adBody: inputDescription,
      price: inputPrice,
      sell: inputTransactionType === "sell",
      tags: selectedTags.join(","),
    };
    try {
      await dispatch(createProduct(product)).unwrap(); // Despacha la acción y maneja los resultados

      // Aquí puedes manejar el éxito, como redirigir al usuario o mostrar un mensaje
    } catch (error) {
      console.error("Failed to create product: ", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="new-product__wrapper">
      {/* Overlay */}
      <div className="new-product__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="h4 mb-2 text-center">Introduce tu producto</div>
        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Debes seleccionar al menos un tag.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={inputName}
            placeholder="Nombre del producto"
            onChange={(e) => setInputName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputDescription}
            placeholder="Descripción del producto"
            onChange={(e) => setInputDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={inputPrice}
            placeholder="Precio del producto"
            onChange={(e) => setInputPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tipo de transacción</Form.Label>
          <Form.Check
            type="radio"
            label="Venta"
            value="sell"
            checked={inputTransactionType === "sell"}
            onChange={(e) => setInputTransactionType(e.target.value)}
            required
            id="sell"
          />
          <Form.Check
            type="radio"
            label="Compra"
            value="buy"
            checked={inputTransactionType === "buy"}
            onChange={(e) => setInputTransactionType(e.target.value)}
            required
            id="buy"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tags</Form.Label>
          <div className="tags-container">
            {TAG_OPTIONS.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                label={tag.charAt(0).toUpperCase() + tag.slice(1)}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                id={tag}
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="image">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            value={inputImage}
            placeholder="URL de la imagen"
            onChange={(e) => setInputImage(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Crear Producto
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Creando...
          </Button>
        )}
      </Form>
    </div>
  );
};

export default NewProductPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { createProduct } from "../../store/productsThunk";
import "./NewProduct.css";
import { resetMessage, setMessage } from "../../store/uiSlice";
import { getError, getUILoading } from "../../store/selectors";
import ImageUploader from "./components/ImageUploader";

const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

const NewProductPage = () => {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTransactionType, setInputTransactionType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);
  const error = useSelector(getError);
  const loading = useSelector(getUILoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleInputDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleInputTransactionTypeChange = (e) => {
    setInputTransactionType(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setInputPrice(value);
  };

  const handlePriceBlur = () => {
    if (inputPrice && inputPrice > 0) {
      setInputPrice(parseFloat(inputPrice).toFixed(2));
    } else {
      setInputPrice("0.00");
    }
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputName) {
      dispatch(
        setMessage({
          payload: "Introduce un nombre para tu producto.",
          type: "error",
        })
      );
      return;
    }

    if (!inputDescription) {
      dispatch(
        setMessage({
          payload: "Introduce una descripción para tu producto.",
          type: "error",
        })
      );
      return;
    }

    if (inputPrice === "0.00" || !inputPrice) {
      dispatch(
        setMessage({
          payload: "Introduce un precio válido para tu producto.",
          type: "error",
        })
      );
      return;
    }

    if (!inputTransactionType) {
      dispatch(
        setMessage({
          payload: "Selecciona un tipo de transacción.",
          type: "error",
        })
      );
      return;
    }

    if (selectedTags.length === 0) {
      dispatch(
        setMessage({
          payload: "Selecciona al menos un tag.",
          type: "error",
        })
      );
      return;
    }

    if (!inputImage) {
      dispatch(
        setMessage({
          payload: "Selecciona una imagen para tu producto.",
          type: "error",
        })
      );
      return;
    }

    await (async () => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    })();

    const formData = new FormData();
    formData.append("adTitle", inputName);
    formData.append("adBody", inputDescription);
    formData.append("price", inputPrice);
    formData.append("sell", inputTransactionType === "sell");
    formData.append("tags", selectedTags.join(","));
    if (inputImage) formData.append("photo", inputImage);

    try {
      const response = await dispatch(createProduct(formData)).unwrap(); // unwrap() is used to get the actual value of the fulfilled action
      navigate(`/product/${response._id}`);
    } catch (errorMsg) {
      console.error("Failed to create product: ", errorMsg);
    }
  };

  const clearError = () => {
    dispatch(resetMessage());
  };

  useEffect(() => {
    if (error) dispatch(resetMessage());
  }, []);

  return (
    <div className="new-product__wrapper">
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Introduce tu producto</div>
        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={inputName}
            placeholder="Nombre del producto"
            onChange={handleInputNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputDescription}
            placeholder="Descripción del producto"
            onChange={handleInputDescriptionChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={inputPrice}
            placeholder="0,00"
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Tipo de transacción</Form.Label>
          <Form.Check
            type="radio"
            label="Venta"
            value="sell"
            checked={inputTransactionType === "sell"}
            onChange={handleInputTransactionTypeChange}
            required
            id="sell"
          />
          <Form.Check
            type="radio"
            label="Compra"
            value="buy"
            checked={inputTransactionType === "buy"}
            onChange={handleInputTransactionTypeChange}
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
        <Form.Group className="mb-2">
          <ImageUploader
            inputImagePreview={inputImagePreview}
            setInputImage={setInputImage}
            setInputImagePreview={setInputImagePreview}
          />
        </Form.Group>
        {error && (
          <Alert
            className="mt-2"
            variant="danger"
            onClose={() => clearError()}
            dismissible
          >
            {error}
          </Alert>
        )}
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

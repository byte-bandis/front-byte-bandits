import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Display, X } from "react-bootstrap-icons";
import { createProduct } from "../../store/productsThunk";
import "./NewProduct.css";
import { resetMessage, setMessage } from "../../store/uiSlice";
import { getError, getUILoading } from "../../store/selectors";

const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

const NewProductPage = () => {
  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTransactionType, setInputTransactionType] = useState("sell");
  const [selectedTags, setSelectedTags] = useState([]);
  const error = useSelector(getError);
  const loading = useSelector(getUILoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    setImageFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const setImageFile = (file) => {
    setInputImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setInputImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setInputImage(null);
    setInputImagePreview("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedTags.length === 0) {
      dispatch(
        setMessage({
          payload: "Selecciona al menos un tag.",
          type: "error",
        })
      );
      return;
    }

    if (inputPrice === "0.00") {
      dispatch(
        setMessage({
          payload: "El precio debe ser mayor que 0.",
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
      <div className="new-product__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Introduce tu producto</div>
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
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
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
          <Form.Label></Form.Label>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {inputImagePreview ? (
              <div className="image-preview">
                <img src={inputImagePreview} alt="Product Preview" />
                <button onClick={handleRemoveImage} className="remove-btn">
                  <X className="remove-btn-x" />
                </button>
              </div>
            ) : (
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={handleImageChange}
                  required={!inputImage}
                />
                Arrastra y suelta aquí o haz clic para seleccionar una imagen
              </label>
            )}
          </div>
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
      </Form>
    </div>
  );
};

export default NewProductPage;

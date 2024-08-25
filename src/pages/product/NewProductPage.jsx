import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Button from "./components/Button";
import { createAd, getAds, updateAd } from "../../store/adsThunk";
import {
  StyledForm,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  TagsContainer,
} from "./NewProductPageStyles";
import { resetMessage, setMessage } from "../../store/uiSlice";
import {
  getError,
  getUILoading,
  getLoggedUserName,
  getAdsSelector,
  getLoggedUserId,
} from "../../store/selectors";
import ImageUploader from "./components/ImageUploader";

const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

const NewProductPage = ({ isEditMode = false }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTransactionType, setInputTransactionType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);
  const error = useSelector(getError);
  const loading = useSelector(getUILoading);
  const loadedAd = useSelector(getAdsSelector).find(
    (advert) => advert._id === productId
  );

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

    await (async () => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    })();

    const formData = new FormData();
    formData.append("adTitle", inputName);
    formData.append("adBody", inputDescription);
    formData.append("price", inputPrice);
    formData.append("sell", inputTransactionType === "sell");
    formData.append("tags", selectedTags.join(","));

    if (!isEditMode) {
      formData.append("photo", inputImage ? inputImage : "");
    } else if (isEditMode && productId) {
      if (inputImage) {
        formData.append("photo", inputImage);
        if (!loadedAd.photo.endsWith("/")) {
          formData.append(
            "deletePhoto",
            loadedAd.photo.substring(loadedAd.photo.lastIndexOf("/") + 1)
          );
        }
      }
      if (!inputImagePreview && !loadedAd.photo.endsWith("/")) {
        formData.append("photo", "");
        formData.append(
          "deletePhoto",
          loadedAd.photo.substring(loadedAd.photo.lastIndexOf("/") + 1)
        );
      }
    }

    try {
      let response;
      if (isEditMode && productId) {
        response = await dispatch(
          updateAd({ adId: productId, adFormData: formData })
        ).unwrap();
      } else {
        response = await dispatch(createAd(formData)).unwrap();
      }

      await (async () => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
      })();
      navigate(`/product/${response._id}`);
    } catch (errorMsg) {
      console.error("Failed to process product: ", errorMsg);
    }
  };

  const clearError = () => {
    dispatch(resetMessage());
  };

  useEffect(() => {
    if (error) clearError();
  }, []);

  useEffect(() => {
    if (isEditMode && productId) {
      const fetchAd = async () => {
        try {
          let fetchedAd = loadedAd;
          if (!fetchedAd) {
            const fetchedAds = await dispatch(
              getAds({ id: productId })
            ).unwrap();
            fetchedAd = fetchedAds[0] || undefined;
          }
          if (fetchedAd === undefined) {
            navigate("/404");
          }
          if (fetchedAd !== undefined) {
            setInputName(fetchedAd.adTitle);
            setInputDescription(fetchedAd.adBody);
            setInputPrice(fetchedAd.price);
            setInputTransactionType(fetchedAd.sell ? "sell" : "buy");
            fetchedAd.tags.forEach((tag) => {
              setSelectedTags((prevTags) =>
                prevTags.includes(tag) ? prevTags : [...prevTags, tag]
              );
            });
            setInputImagePreview(
              fetchedAd.photo.endsWith("/") ? null : fetchedAd.photo
            );
          }
        } catch (errorMsg) {
          console.error("Failed to fetch product: ", errorMsg);
        }
      };
      fetchAd();
    }
  }, [isEditMode, productId]);

  return (
    <div className="my-4">
      <StyledForm onSubmit={handleSubmit}>
        <h4 className="mb-2 text-center">
          {isEditMode ? "Edita tu producto" : "Introduce tu producto"}
        </h4>
        <StyledInputGroup>
          <StyledLabel>Nombre</StyledLabel>
          <StyledInput
            type="text"
            value={inputName}
            placeholder="Nombre del producto"
            onChange={handleInputNameChange}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Descripción</StyledLabel>
          <StyledInput
            as="textarea"
            rows={3}
            value={inputDescription}
            placeholder="Descripción del producto"
            onChange={handleInputDescriptionChange}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Precio</StyledLabel>
          <StyledInput
            type="number"
            step="0.01"
            value={inputPrice}
            placeholder="0,00"
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Tipo de transacción</StyledLabel>
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
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Tags</StyledLabel>
          <TagsContainer>
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
          </TagsContainer>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Foto</StyledLabel>
          <ImageUploader
            inputImagePreview={inputImagePreview}
            setInputImage={setInputImage}
            setInputImagePreview={setInputImagePreview}
          />
        </StyledInputGroup>
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
          <Button
            type="submit"
            $customVerticalPadding="6px"
            $customwidth="100%"
          >
            {isEditMode ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        ) : (
          <Button $customVerticalPadding="6px" $customwidth="100%" disabled>
            {isEditMode ? "Guardando..." : "Creando..."}
          </Button>
        )}
      </StyledForm>
    </div>
  );
};

export default NewProductPage;

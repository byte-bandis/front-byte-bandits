import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import RegularButton from "../../components/shared/buttons/RegularButton";
import { createAd, getAds, updateAd } from "../../store/adsThunk";
import { resetMessage, setMessage } from "../../store/uiSlice";
import { getError, getAdsSelector } from "../../store/selectors";
import ImageUploader from "./components/ImageUploader";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StyledContainer from "../../components/shared/StyledContainer";

const TAG_OPTIONS = ["lifestyle", "mobile", "motor", "work", "others"];

const NewProductPage = ({ isEditMode = false }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTransactionType, setInputTransactionType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);
  const error = useSelector(getError);
  const [loading, setLoading] = useState(false);
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
          payload: t("enter_product_name"),
          type: "error",
        })
      );
      return;
    }

    if (!inputDescription) {
      dispatch(
        setMessage({
          payload: t("enter_product_description"),
          type: "error",
        })
      );
      return;
    }

    if (inputPrice === "0.00" || !inputPrice) {
      dispatch(
        setMessage({
          payload: t("enter_valid_product_price"),
          type: "error",
        })
      );
      return;
    }

    if (!inputTransactionType) {
      dispatch(
        setMessage({
          payload: t("select_transaction_type"),
          type: "error",
        })
      );
      return;
    }

    if (selectedTags.length === 0) {
      dispatch(
        setMessage({
          payload: t("select_at_least_one_tag"),
          type: "error",
        })
      );
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    dispatch(resetMessage());
  };

  useEffect(() => {
    if (error) clearError();
  }, []);

  useEffect(() => {
    if (error) clearError();
    if (!isEditMode) {
      setInputName("");
      setInputDescription("");
      setInputPrice("");
      setInputTransactionType(null);
      setSelectedTags([]);
      setInputImage(null);
      setInputImagePreview(null);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode && productId) {
      const fetchAd = async () => {
        try {
          let fetchedAd = loadedAd;
          try {
            if (!fetchedAd) {
              const fetchedAds = await dispatch(
                getAds({ id: productId })
              ).unwrap();
              fetchedAd = fetchedAds[0] || undefined;
            }
          } catch (errorMsg) {
            console.error("Failed to fetch product: ", errorMsg.message);
          }
          if (fetchedAd === undefined) {
            navigate("/404");
            return;
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
    <StyledContainer
      className="mx-auto py-5"
      $customBackground="rgba(3, 88, 75, 0.6)"
      $customBorderRadius="0"
    >
      <StyledForm onSubmit={handleSubmit}>
        <h4 className="mb-2 text-center">
          {isEditMode ? t("edit_your_product") : t("introduce_your_product")}
        </h4>
        <StyledInputGroup>
          <StyledLabel>{t("name1")}</StyledLabel>
          <StyledInput
            type="text"
            value={inputName}
            placeholder={t("product_name")}
            onChange={handleInputNameChange}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>{t("description")}</StyledLabel>
          <StyledInput
            as="textarea"
            rows={3}
            value={inputDescription}
            placeholder={t("product_description")}
            onChange={handleInputDescriptionChange}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>{t("price")}</StyledLabel>
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
          <StyledLabel>{t("transaction_type")}</StyledLabel>
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
          <StyledLabel>{t("tags")}</StyledLabel>
          <TagsContainer>
            {TAG_OPTIONS.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                label={t(tag).charAt(0).toUpperCase() + t(tag).slice(1)}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                id={tag}
              />
            ))}
          </TagsContainer>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>{t("photo")}</StyledLabel>
          <ImageUploader
            inputImagePreview={inputImagePreview}
            dropAreaText={t(
              "drag_and_drop_your_image_here_or_click_to_upload_from_your_computer"
            )}
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
          <RegularButton
            type="submit"
            $customVerticalPadding="6px"
            $customwidth="100%"
            $customBackground="var(--accent-100)"
            $customBorder="none"
            $customColor="var(--bg-100)"
            $customHoverBackgroundColor="var(--accent-200)"
          >
            {isEditMode ? t("save_changes") : t("create_product")}
          </RegularButton>
        ) : (
          <RegularButton
            $customVerticalPadding="6px"
            $customwidth="100%"
            $customBackground="var(--accent-100)"
            $customBorder="none"
            $customColor="var(--bg-100)"
            $customHoverBackgroundColor="var(--accent-200)"
            disabled
          >
            {(isEditMode ? t("saving") : t("creating")) + "..."}
          </RegularButton>
        )}
      </StyledForm>
    </StyledContainer>
  );
};

const StyledForm = styled.form`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
  animation: showSignInForm 1s;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem var(--shadow-1);
  border-radius: 0.375rem;
  background-color: var(--bg-100);
  color: var(--text-200);
  opacity: 1;
  color: var(--primary-300);
`;

const StyledInputGroup = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  &:focus {
    outline: none;
    border-color: rgba(128, 189, 255, 1);
    box-shadow: 0 0 0 0.2rem rgba(128, 189, 255, 0.5);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export default NewProductPage;

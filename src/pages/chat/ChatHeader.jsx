import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserId } from "../../store/selectors";
import { client } from "../../api/client";
import noImage from "../../assets/images/no-image.jpg";
import styled from "styled-components";

const ChatHeader = ({ product, user }) => {
  const navigate = useNavigate();
  const loggedUserId = useSelector(getLoggedUserId);
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    if (!loggedUserId || !user) return;

    if (user.username.toString() === "deleted_" + user._id.toString()) {
      setUserPhoto(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await client.get(`/user/${user.username}`);
        setUserPhoto(response.data.userPhoto);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, [user, loggedUserId]);

  const handleProductClick = () => {
    if (product.available) {
      navigate(`/product/${product._id}`);
    }
  };

  const handleUserClick = () => {
    navigate(`/${user.username}`);
  };

  return (
    <HeaderContainer>
      <ProductImage
        src={product.photo ? product.photo : noImage}
        alt={product.adTitle}
        crossOrigin="http://localhost:4000/"
        available={product.available}
        onClick={product.available ? handleProductClick : null}
      />
      <ProductTitleContainer
        available={product.available}
        onClick={product.available ? handleProductClick : null}
      >
        <ProductTitle>{product.adTitle}</ProductTitle>
      </ProductTitleContainer>
      {userPhoto && (
        <UserAvatar
          src={userPhoto}
          alt={user.username}
          crossOrigin="http://localhost:4000/"
          available={
            user.username.toString() !== "deleted_" + user._id.toString()
          }
          onClick={
            user.username.toString() !== "deleted_" + user._id.toString()
              ? handleUserClick
              : null
          }
        />
      )}
    </HeaderContainer>
  );
};

ChatHeader.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    adTitle: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--bg-200);
  border: 1px solid var(--bg-300);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  cursor: ${(props) => (props.available ? "pointer" : "default")};
  margin-right: 15px;
  margin-left: 10px;
  opacity: ${(props) => (props.available ? 1 : 0.5)};

  ${(props) =>
    props.available &&
    `
    &:hover {
      opacity: 0.8;
    }
  `}
`;

const ProductTitleContainer = styled.div`
  cursor: ${(props) => (props.available ? "pointer" : "default")};

  ${(props) =>
    props.available &&
    `
    &:hover ${ProductTitle} {
      font-weight: bold;
    }
  `}
`;

const ProductTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: ${(props) => (props.available ? "pointer" : "default")};
  margin-left: auto;
  margin-right: 10px;
  opacity: ${(props) => (props.available ? 1 : 0.5)};

  ${(props) =>
    props.available &&
    `
    &:hover {
      opacity: 0.8;
    }
  `}
`;

export default ChatHeader;

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoggedUserId } from "../../store/selectors";
import { client } from "../../api/client";
import styled from "styled-components";

const ChatHeader = ({ product, user }) => {
  const navigate = useNavigate();
  const loggedUserId = useSelector(getLoggedUserId);
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    if (!loggedUserId) return;
    const fetchUser = async () => {
      try {
        const response = await client.get(`/user/${user.username}`);
        setUserPhoto(response.data.userPhoto);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, [user.username, loggedUserId]);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleUserClick = () => {
    navigate(`/${user.username}`);
  };

  return (
    <HeaderContainer>
      <ProductImage
        src={product.photo}
        alt={product.adTitle}
        crossOrigin="http://localhost:4000/"
        onClick={handleProductClick}
      />
      <ProductTitleContainer onClick={handleProductClick}>
        <ProductTitle>{product.adTitle}</ProductTitle>
      </ProductTitleContainer>
      <UserAvatar
        src={userPhoto || "/path/to/default-avatar.jpg"}
        alt={user.username}
        crossOrigin="http://localhost:4000/"
        onClick={handleUserClick}
      />
    </HeaderContainer>
  );
};

ChatHeader.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    adTitle: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--bg-200);
  border-bottom: 1px solid var(--bg-300);
  border-radius: 8px 8px 0 0;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 15px;
  margin-left: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const ProductTitleContainer = styled.div`
  cursor: pointer;
`;

const ProductTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 1.1rem;

  &:hover {
    font-weight: bold;
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

export default ChatHeader;

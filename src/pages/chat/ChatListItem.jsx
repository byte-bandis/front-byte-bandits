import PropTypes from "prop-types";
import styled from "styled-components";
import noImage from "../../assets/images/no-image.jpg";
import { useTranslation } from "react-i18next";

const ChatListItem = ({ chat, isSelected, onClick, loggedUserId }) => {
  const { product, buyer, seller, messages } = chat;
  const unreadMessages = messages.totalUnreadMessages;
  const counterpart = loggedUserId === buyer._id ? seller : buyer;
  const { t } = useTranslation();

  return (
    <StyledChatListItem isSelected={isSelected} onClick={onClick}>
      <img
        src={product.photo ? product.photo : noImage}
        alt={product?.adTitle}
        className="product-photo"
        crossOrigin="http://localhost:4000/"
      />
      <div className="chat-info">
        <h3 className="product-title">{product?.adTitle}</h3>
        <p className="counterpart-name">
          {loggedUserId === buyer._id ? t("seller") : t("buyer")}:{" "}
          {counterpart.name + " " + counterpart.lastname}
        </p>
      </div>
      {unreadMessages > 0 && (
        <div className="unread-messages">{unreadMessages}</div>
      )}
    </StyledChatListItem>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

const StyledChatListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid var(--primary-100);
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  background-color: ${(props) =>
    props.isSelected ? "var(--primary-100)" : "var(--bg-200)"};
  border-radius: 8px;

  .product-photo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .product-title {
    font-size: 16px;
    margin: 0;
    font-weight: bold;
    color: ${(props) =>
      props.isSelected ? "var(--bg-100)" : "var(--text-100)"};
  }

  .counterpart-name {
    font-size: 13px;
    color: ${(props) =>
      props.isSelected ? "var(--bg-100)" : "var(--text-200)"};
  }

  .unread-messages {
    background-color: var(--primary-300);
    color: var(--bg-100);
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default ChatListItem;

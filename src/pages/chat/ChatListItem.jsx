import React from "react";
import PropTypes from "prop-types";
import "./ChatListItem.css";

const ChatListItem = ({ chat, isSelected, onClick, loggedUserId }) => {
  const { product, buyer, seller, messages } = chat;
  const unreadMessages = messages.filter(
    (message) => !message.read && message.user._id !== loggedUserId
  ).length;
  const counterpart = loggedUserId === buyer._id ? seller : buyer;

  return (
    <div
      className={`chat-list-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img
        src={product?.photo}
        alt={product?.adTitle}
        className="product-photo"
        crossOrigin="http://localhost:4000/"
      />
      <div className="chat-info">
        <h3 className="product-title">{product?.adTitle}</h3>
        <p className="counterpart-name">
          {loggedUserId === buyer._id ? "Vendedor" : "Comprador"}:
          {" " + counterpart.name + " " + counterpart.lastname}
        </p>
      </div>
      {unreadMessages > 0 && (
        <div className="unread-messages">{unreadMessages}</div>
      )}
    </div>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};

export default ChatListItem;

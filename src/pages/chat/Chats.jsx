import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { client } from "../../api/client";
import Chat from "./Chat";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector } from "react-redux";
import "./Chats.css";

const Chats = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState({
    product: { _id: null },
    buyer: { _id: null },
  });
  const loggedUserId = useSelector(getLoggedUserId);
  const location = useLocation();

  // Obtener el productId de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get("productId");

    if (productId) {
      setSelectedChat({
        product: { _id: productId },
        buyer: { _id: loggedUserId },
      });
    }
  }, [location.search, loggedUserId]);

  // Cargar la lista de chats del usuario actual
  useEffect(() => {
    if (loggedUserId) {
      const fetchChats = async () => {
        try {
          const response = await client.get(`/chat`);
          setChatList(response.chats);
        } catch (error) {
          console.error("Error al obtener la lista de chats:", error);
        }
      };

      fetchChats();
    }
  }, [loggedUserId]);

  return (
    <div className="chats-container">
      <div className="chat-list">
        {chatList.length === 0 ? (
          <p>No tienes chats aún.</p>
        ) : (
          chatList.map(
            (chat) =>
              chat.product &&
              chat.product._id && (
                <div
                  key={chat.product._id}
                  className={`chat-list-item ${
                    chat.product._id === selectedChat.product._id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  Chat sobre: {chat.product.adTitle}
                </div>
              )
          )
        )}
      </div>
      <div className="chat-window">
        {selectedChat && selectedChat.product._id ? (
          <Chat
            productId={selectedChat.product._id}
            buyerId={selectedChat.buyer._id}
          />
        ) : (
          <p>Selecciona un chat para comenzar.</p>
        )}
      </div>
    </div>
  );
};

export default Chats;

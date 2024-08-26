import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { client } from "../../api/client";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector } from "react-redux";

const socket = io(import.meta.env.VITE_API_BASE_URL);

const Chat = ({ productId, buyerId }) => {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedUserId = useSelector(getLoggedUserId);

  // Verificar si existe un chat al montar el componente
  useEffect(() => {
    const checkOrCreateChat = async () => {
      try {
        const response = await client.post("/chat", { productId, buyerId });
        setChatId(response.chat._id);
        console.log("Chat creado o verificado:", response.chat._id);

        // Unirse al chat
        socket.emit("joinChat", {
          chatId: response.chat._id,
          userId: loggedUserId,
        });

        // Escuchar el historial de mensajes
        socket.on("chatHistory", (chatHistory) => {
          setMessages(chatHistory);
        });

        // Escuchar nuevos mensajes
        socket.on("newMessage", (newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      } catch (error) {
        console.error("Error al verificar o crear el chat:", error);
      }
    };

    checkOrCreateChat();

    return () => {
      socket.off("chatHistory");
      socket.off("newMessage");
    };
  }, [productId, buyerId, loggedUserId]);

  // Manejar el envío del mensaje
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && chatId) {
      socket.emit("sendMessage", {
        chatId,
        senderId: loggedUserId,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === loggedUserId ? "sent" : "received"
            }`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form className="send-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;

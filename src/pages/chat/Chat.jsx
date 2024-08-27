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

  useEffect(() => {
    const checkChatExists = async () => {
      try {
        const response = await client.get(`/chat`, {
          params: { productId, buyerId },
        });
        if (response.chats && response.chats.length > 0) {
          const existingChatId = response.chats[0]._id;
          setChatId(existingChatId);

          // Unirse al chat existente
          socket.emit("joinChat", {
            chatId: existingChatId,
            userId: loggedUserId,
          });
        }
      } catch (error) {
        console.error("Error al verificar la existencia del chat:", error);
      }
    };

    checkChatExists();

    // Escuchar el historial de mensajes
    socket.on("chatHistory", (chatHistory) => {
      setMessages(chatHistory);
    });

    // Escuchar nuevos mensajes
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("newMessage");
    };
  }, [productId, buyerId, loggedUserId, socket]);

  // Manejar el envío del mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        // Si no hay chatId, crear uno nuevo antes de enviar el mensaje
        if (!chatId) {
          const response = await client.post("/chat", { productId, buyerId });
          setChatId(response.chat._id);

          // Unirse al nuevo chat
          socket.emit("joinChat", {
            chatId: response.chat._id,
            userId: loggedUserId,
          });
        }

        // Enviar el mensaje
        socket.emit("sendMessage", {
          chatId,
          senderId: loggedUserId,
          content: message,
        });

        setMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.user._id === loggedUserId ? "sent" : "received"
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

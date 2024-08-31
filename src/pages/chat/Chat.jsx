import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { client } from "../../api/client";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector } from "react-redux";

const socket = io(import.meta.env.VITE_API_BASE_URL.replace("api/", ""), {
  transports: ["websocket"],
  path:
    import.meta.env.VITE_USER_NODE_ENV !== "production"
      ? "/socket.io"
      : "/api/socket.io",
  withCredentials: true,
});

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
  }, [productId, buyerId, loggedUserId]);

  // Suscribirse a los eventos del chat después de que `chatId` esté disponible
  useEffect(() => {
    if (chatId) {
      // Escuchar el historial de mensajes
      socket.on("chatHistory", (chatHistory) => {
        setMessages(chatHistory);
      });

      // Escuchar nuevos mensajes
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Limpiar las suscripciones cuando el componente se desmonte o `chatId` cambie
      return () => {
        socket.off("chatHistory");
        socket.off("newMessage");
      };
    }
  }, [chatId]);

  // Manejar el envío del mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        // Si no hay chatId, crear uno nuevo antes de enviar el mensaje
        let currentChatId = chatId;
        if (!chatId) {
          const response = await client.post("/chat", { productId, buyerId });
          currentChatId = response.chat._id;

          setChatId(currentChatId);
          console.log("Chat creado:", response.chat);

          // Unirse al nuevo chat
          socket.emit("joinChat", {
            chatId: currentChatId,
            userId: loggedUserId,
          });
        }

        const newMessage = {
          chatId: currentChatId,
          senderId: loggedUserId,
          content: message,
        };

        // Enviar el mensaje
        socket.emit("sendMessage", newMessage);

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

import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { client } from "../../api/client";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector } from "react-redux";
import { Check2All, Send } from "react-bootstrap-icons";
import { getError } from "../../store/selectors";
import { useDispatch } from "react-redux";
import { resetMessage } from "../../store/uiSlice";
import { useSocket } from "../../context/SocketContext";

const Chat = ({ productId, buyerId }) => {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedUserId = useSelector(getLoggedUserId);
  const messageContainerRef = useRef(null);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    if (!loggedUserId) return;

    const checkChatExists = async () => {
      try {
        const response = await client.get(`/chat`, {
          params: { productId, buyerId, isExtended: true },
        });
        if (response.chats && response.chats.length > 0) {
          const existingChatId = response.chats[0]._id;
          setChatId(existingChatId);
          setMessages(response.chats[0].messages);

          socket.emit("joinChat", {
            chatId: existingChatId,
          });
        } else {
          setMessages([]);
          setChatId(null);
        }
      } catch (error) {
        console.error("Error al verificar la existencia del chat:", error);
      }
    };

    checkChatExists();

    if (chatId) {
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (newMessage.user._id !== loggedUserId) {
          socket.emit("readMessage", {
            chatId,
          });
        }
      });

      socket.on("messagesRead", (userId) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg.user._id !== userId) {
              return { ...msg, read: true };
            }
            return msg;
          })
        );
      });
    }

    return () => {
      socket.off("newMessage");
      socket.off("messagesRead");
      socket.emit("leaveChat", { chatId });
    };
  }, [productId, buyerId, chatId, loggedUserId, socket]);

  const clearError = () => {
    dispatch(resetMessage());
  };

  useEffect(() => {
    if (error) clearError();
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
          });
        }

        const newMessage = {
          chatId: currentChatId,
          senderId: loggedUserId,
          content: message,
        };

        console.log("Enviando mensaje:", newMessage);
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
      <div className="message-container" ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.user._id === loggedUserId ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <span>{msg.content}</span>
            </div>
            <div className="message-info">
              <span className="timestamp">
                {new Date(msg.timestamp)
                  .toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")}
              </span>
              {msg.user._id === loggedUserId && (
                <span className={`tick ${msg.read ? "read" : ""}`}>
                  <span />
                  <Check2All />
                </span>
              )}
            </div>
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
        <button
          type="submit"
          className={`${message === "" ? "empty" : "filled"}`}
        >
          <Send />{" "}
        </button>
      </form>
    </div>
  );
};

export default Chat;

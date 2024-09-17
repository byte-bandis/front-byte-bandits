import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSocket } from "../../context/SocketContext";
import { client } from "../../api/client";
import { getLoggedUserId, getError } from "../../store/selectors";
import { resetMessage } from "../../store/uiSlice";
import { Check2All, Send } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const Chat = ({ productId, buyerId, user }) => {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const loggedUserId = useSelector(getLoggedUserId);
  const messageContainerRef = useRef(null);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();

  useEffect(() => {
    setChatId(null);
    setMessages([]);
    setMessage("");
  }, [productId, buyerId]);

  useEffect(() => {
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

          socket.emit("joinChat", { chatId: existingChatId });
        } else {
          setMessages([]);
          setChatId(null);
        }
      } catch (error) {
        console.error("Error al verificar la existencia del chat:", error);
      }
    };

    checkChatExists();
  }, [productId, buyerId]);

  useEffect(() => {
    if (!chatId || !loggedUserId) return;

    if (chatId) {
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (newMessage.user._id !== loggedUserId) {
          socket.emit("readMessage", { chatId });
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
  }, [chatId]);

  useEffect(() => {
    if (error) dispatch(resetMessage());
  }, [error, dispatch]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        let currentChatId = chatId;
        if (!chatId) {
          const response = await client.post("/chat", { productId, buyerId });
          currentChatId = response.chat._id;

          setChatId(currentChatId);

          socket.emit("joinChat", { chatId: currentChatId });
        }

        const newMessage = {
          chatId: currentChatId,
          senderId: loggedUserId,
          content: message,
        };

        socket.emit("sendMessage", newMessage);

        setMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  return (
    <ChatContainer>
      <MessageContainer ref={messageContainerRef}>
        {messages.map((msg, index) => (
          <Message
            key={index}
            className={msg.user._id === loggedUserId ? "sent" : "received"}
          >
            <MessageContent>
              <span>{msg.content}</span>
            </MessageContent>
            <MessageInfo>
              <Timestamp
                className={msg.user._id === loggedUserId ? "sent" : "received"}
              >
                {new Date(msg.timestamp)
                  .toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")}
              </Timestamp>
              {msg.user._id === loggedUserId && (
                <Tick className={msg.read ? "read" : ""}>
                  <span />
                  <Check2All />
                </Tick>
              )}
            </MessageInfo>
          </Message>
        ))}
      </MessageContainer>
      <SendContainer onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            user.username !== "deleted_" + user._id
              ? t("chat_write_message") + "…"
              : t("chat_participant_does_not_exist_anymore")
          }
          disabled={user.username === "deleted_" + user._id}
        />
        <Button type="submit" className={message === "" ? "empty" : "filled"}>
          <Send />
        </Button>
      </SendContainer>
    </ChatContainer>
  );
};

Chat.propTypes = {
  productId: PropTypes.string.isRequired,
  buyerId: PropTypes.string.isRequired,
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: var(--bg-200);
  border: 1px solid #ccc;
  border-radius: 0px 0px 8px 8px;
  height: 85%;
  width: 100%;
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  max-height: 90%;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  width: fit-content;
  max-width: 70%;
  display: flex;
  flex-direction: column;

  &.sent {
    margin-left: auto;
    background-color: var(--accent-100);
    color: var(--text-100);
  }

  &.received {
    margin-right: auto;
    background-color: var(--primary-100);
    color: var(--bg-100);
  }
`;

const MessageContent = styled.div`
  margin-bottom: 4px;
  font-weight: bold;
  font-size: 14px;
`;

const MessageInfo = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 3px;
`;

const Timestamp = styled.span`
  font-size: 9.5px;

  &.sent {
    color: var(--text-200);
  }

  &.received {
    color: var(--bg-100);
  }
`;

const Tick = styled.span`
  font-size: 11px;
  color: var(--text-200);

  &.read {
    color: dodgerblue;
  }
`;

const SendContainer = styled.form`
  display: flex;
  padding: 20px;
  border-top: 1px solid var(--bg-300);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid var(--bg-300);
  border-radius: 40px;
`;

const Button = styled.button`
  width: 44px;
  height: 44px;
  padding: 10px;
  background-color: var(--primary-200);
  color: white;
  border: none;
  border-radius: 40px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--primary-300);
  }

  &.empty {
    background-color: var(--primary-100);
    pointer-events: none;
  }
`;

export default Chat;

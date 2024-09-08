import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { client } from "../../api/client";
import Chat from "./Chat";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector } from "react-redux";
import "./Chats.css";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ChatListItem from "./ChatListItem";
import { getAdsSelector } from "../../store/selectors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAds } from "../../store/adsThunk";
import socket from "../../utils/socket";

const Chats = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const loggedUserId = useSelector(getLoggedUserId);
  const location = useLocation();
  const productId =
    new URLSearchParams(location.search).get("productId") || undefined;
  const loadedAd = useSelector(getAdsSelector).find(
    (advert) => advert._id === productId
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedUserId) return;

    socket.emit("connectUser");
    console.log("Connected to socket");

    socket.on("messagesRead", () => {
      fetchChats();
      console.log("Messages read");
    });

    socket.on("newMessage", () => {
      fetchChats();
      console.log("New message");
    });

    return () => {
      socket.off("messagesRead");
      socket.off("newMessage");
    };
  }, [loggedUserId]);

  useEffect(() => {
    const checkProduct = async () => {
      if (productId && loggedUserId) {
        let fetchedAd = loadedAd;
        try {
          if (!fetchedAd) {
            const fetchedAds = await dispatch(
              getAds({ id: productId })
            ).unwrap();
            fetchedAd = fetchedAds[0] || undefined;
          }
        } catch (errorMsg) {
          console.error("Failed to fetch product: ", errorMsg.message);
        }

        if (fetchedAd === undefined || fetchedAd.user._id === loggedUserId) {
          navigate("/404");
          return;
        }
      }
    };

    checkProduct();
  }, [productId, loggedUserId]);

  useEffect(() => {
    fetchChats();
  }, [loadedAd, loggedUserId, productId]);

  const fetchChats = async () => {
    if (!loggedUserId) return;

    try {
      const response = await client.get(`/chat`);
      const existingChats = response.chats || [];

      if (productId) {
        setSelectedChat({
          product: { _id: productId },
          buyer: { _id: loggedUserId },
        });
      }

      if (
        productId &&
        loadedAd &&
        !existingChats.some((chat) => chat.product._id === productId)
      ) {
        const newChat = {
          product: {
            _id: productId,
            photo: loadedAd.photo,
            adTitle: loadedAd.adTitle,
          },
          buyer: { _id: loggedUserId },
          messages: [],
          seller: {
            _id: loadedAd.user._id,
            name: loadedAd.user.name,
            lastname: loadedAd.user.lastname,
          },
          _id: "new",
        };
        setChatList([newChat, ...existingChats]);
      }

      if (
        !productId ||
        existingChats.some((chat) => chat.product._id === productId)
      ) {
        setChatList(existingChats);
      }
    } catch (error) {
      console.error("Error al obtener la lista de chats:", error);
    }
  };

  return (
    <StyledMyAccount>
      <div className="chats-container">
        <div className="chat-list">
          {chatList.length === 0 ? (
            <p>No tienes chats aún.</p>
          ) : (
            chatList.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                isSelected={chat.product?._id === selectedChat?.product?._id}
                onClick={() => setSelectedChat(chat)}
                loggedUserId={loggedUserId}
              />
            ))
          )}
        </div>
        <div className="chat-window">
          {selectedChat && selectedChat.product?._id ? (
            <Chat
              socket={socket}
              productId={selectedChat.product._id}
              buyerId={selectedChat.buyer._id}
            />
          ) : (
            <p>Selecciona un chat para comenzar.</p>
          )}
        </div>
      </div>
    </StyledMyAccount>
  );
};

export default Chats;

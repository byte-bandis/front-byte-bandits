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
import { useSocket } from "../../context/SocketContext";

const Chats = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const loggedUserId = useSelector(getLoggedUserId);
  const location = useLocation();
  const productId =
    new URLSearchParams(location.search).get("productId") || undefined;
  const buyerId =
    new URLSearchParams(location.search).get("buyerId") || undefined;
  const loadedAd = useSelector(getAdsSelector).find(
    (advert) => advert._id === productId
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (!loggedUserId) return;
    if (!socket) return;

    socket.emit("connectUser");

    socket.on("userMessagesRead", () => {
      fetchChats();
    });

    socket.on("userNewMessage", () => {
      fetchChats();
    });

    return () => {
      socket.off("userMessagesRead");
      socket.off("userNewMessage");
      socket.emit("disconnectUser");
    };
  }, [loggedUserId]);

  useEffect(() => {
    const checkProductAndBuyer = async () => {
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
            return fetchedAd;
          } catch (errorMsg) {
            console.error("Failed to fetch product: ", errorMsg.message);
          }

          if (!fetchedAd) {
            navigate("/404");
            return;
          }
        }
      };

      const checkBuyer = async () => {
        if (buyerId && loggedUserId) {
          let fetchedBuyer = null;
          try {
            const response = await client.get(`/user/find/${buyerId}`);
            fetchedBuyer = response.user;
            return fetchedBuyer;
          } catch (error) {
            console.error("Error al obtener el comprador:", error);
          }
          if (!fetchedBuyer) {
            navigate("/404");
            return;
          }
        }
      };

      const ad = await checkProduct();
      const buyer = await checkBuyer();
      if (ad.user._id !== loggedUserId && buyer._id !== loggedUserId) {
        navigate("/404");
      }
    };

    checkProductAndBuyer();
  }, [productId, loggedUserId]);

  useEffect(() => {
    fetchChats();
    if (productId && buyerId && !selectedChat) {
      setSelectedChat({
        product: { _id: productId },
        buyer: { _id: buyerId },
      });
    }
  }, [loadedAd, loggedUserId, productId, buyerId]);

  const fetchChats = async () => {
    if (!loggedUserId) return;

    try {
      const response = await client.get(`/chat`);
      const existingChats = response.chats || [];

      if (
        productId &&
        buyerId &&
        loadedAd &&
        !existingChats.some(
          (chat) =>
            chat?.product?._id === productId && chat?.buyer?._id === buyerId
        )
      ) {
        const newChat = {
          product: {
            _id: productId,
            photo: loadedAd.photo,
            adTitle: loadedAd.adTitle,
          },
          buyer: { _id: buyerId },
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
        (!productId && !buyerId) ||
        existingChats.some(
          (chat) =>
            chat?.product?._id === productId && chat?.buyer?._id === buyerId
        )
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
            <div className="chat-list-empty">
              <p>No tienes chats aún.</p>
            </div>
          ) : (
            chatList.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                isSelected={
                  chat.product?._id === selectedChat?.product?._id &&
                  chat.buyer?._id === selectedChat?.buyer?._id
                }
                onClick={() => setSelectedChat(chat)}
                loggedUserId={loggedUserId}
              />
            ))
          )}
        </div>
        <div className="chat-window">
          {selectedChat && selectedChat.product?._id ? (
            <Chat
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

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { client } from "../../api/client";
import Chat from "./Chat";
import { getLoggedUserId } from "../../store/selectors";
import { useSelector, useDispatch } from "react-redux";
import { getAds } from "../../store/adsThunk";
import { useSocket } from "../../context/SocketContext";
import StyledMyAccount from "../../components/shared/StyledMyAccount";
import ChatListItem from "./ChatListItem";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import { useTranslation } from "react-i18next";

const Chats = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const loggedUserId = useSelector(getLoggedUserId);
  const location = useLocation();
  const productId =
    new URLSearchParams(location.search).get("productId") || undefined;
  const buyerId =
    new URLSearchParams(location.search).get("buyerId") || undefined;
  const loadedAd = useSelector((state) =>
    state.adsState.data.find((advert) => advert._id === productId)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { t } = useTranslation();

  const fetchChats = async () => {
    if (!loggedUserId) return;

    try {
      const response = await client.get(`/chat`);
      const existingChats = response.chats || [];

      if (existingChats.length === 0 && !productId && !buyerId) {
        setChatList([]);
        setSelectedChat(null);
      }

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
            user: { _id: loadedAd.user._id },
            available: loadedAd.available,
          },
          buyer: { _id: buyerId },
          messages: [],
          seller: {
            _id: loadedAd.user._id,
            name: loadedAd.user.name,
            lastname: loadedAd.user.lastname,
            username: loadedAd.user.username,
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
  }, [loggedUserId, socket, fetchChats]);

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

      if (productId && buyerId) {
        const ad = await checkProduct();
        const buyer = await checkBuyer();
        if (
          (ad.user._id !== loggedUserId && buyer._id !== loggedUserId) ||
          ad.user._id === buyer._id
        ) {
          navigate("/404");
        }
      }
    };

    checkProductAndBuyer();
  }, [productId, buyerId, loggedUserId, loadedAd]);

  useEffect(() => {
    fetchChats();
    if (productId && buyerId && !selectedChat && loadedAd) {
      setSelectedChat({
        product: {
          _id: productId,
          photo: loadedAd.photo,
          adTitle: loadedAd.adTitle,
          user: { _id: loadedAd.user._id },
          available: loadedAd.available,
        },
        buyer: { _id: buyerId },
        messages: [],
        seller: {
          _id: loadedAd.user._id,
          name: loadedAd.user.name,
          lastname: loadedAd.user.lastname,
          username: loadedAd.user.username,
        },
        _id: "new",
      });
    }
  }, [productId, buyerId, loadedAd]);

  useEffect(() => {
    setSelectedChat(null);
    setChatList([]);
  }, [productId, buyerId]);

  return (
    <StyledMyAccount>
      <ChatsContainer>
        <ChatList>
          {chatList.length === 0 ? (
            <ChatListEmpty>
              <p>{t("you_dont_have_any_chat_yet")}</p>
            </ChatListEmpty>
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
        </ChatList>
        <ChatWindow>
          {selectedChat && selectedChat.product?._id ? (
            <>
              <ChatHeader
                product={selectedChat.product}
                user={
                  loggedUserId === selectedChat.product.user
                    ? selectedChat.buyer
                    : selectedChat.seller
                }
              />
              <Chat
                productId={selectedChat.product._id}
                buyerId={selectedChat.buyer._id}
                user={
                  loggedUserId === selectedChat.product.user
                    ? selectedChat.buyer
                    : selectedChat.seller
                }
              />
            </>
          ) : (
            <p>{t("choose_a_chat_to_start")}</p>
          )}
        </ChatWindow>
      </ChatsContainer>
    </StyledMyAccount>
  );
};

const ChatsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 1px solid var(--bg-300);
  padding: 10px;
  overflow-y: auto;
  gap: 5px;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-300);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const ChatListEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-300);
`;

const ChatWindow = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Chats;

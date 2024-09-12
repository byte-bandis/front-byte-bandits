import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import storage from "../utils/storage";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_BASE_URL.replace("api/", ""),
      {
        transports: ["websocket"],
        path:
          import.meta.env.VITE_USER_NODE_ENV !== "production"
            ? "/socket.io"
            : "/api/socket.io",
        query: {
          token: storage.get("authToken"),
        },
        withCredentials: true,
      }
    );

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

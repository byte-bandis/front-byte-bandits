import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ authToken, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authToken || authToken === "null") return;

    const newSocket = io(
      import.meta.env.VITE_API_BASE_URL.replace("api/", ""),
      {
        transports: ["websocket"],
        path:
          import.meta.env.VITE_USER_NODE_ENV !== "production"
            ? "/socket.io"
            : "/api/socket.io",
        query: {
          token: authToken,
        },
        withCredentials: true,
      }
    );

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

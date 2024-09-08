import io from 'socket.io-client';
import storage from './storage';

const socket = io(import.meta.env.VITE_API_BASE_URL.replace("api/", ""), {
  transports: ["websocket"],
  path: import.meta.env.VITE_USER_NODE_ENV !== "production"
    ? "/socket.io"
    : "/api/socket.io",
  query: {
    token: storage.get("authToken"),
  },
  withCredentials: true,
});

export default socket;

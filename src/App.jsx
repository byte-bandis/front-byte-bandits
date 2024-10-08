import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import storage from "./utils/storage";
import { SocketProvider } from "./context/SocketContext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoggedUserId } from "./store/selectors";
import { setAuthorizationHeader } from "./api/client";

function App() {
  const [accessToken, setAccessToken] = useState(
    storage.get("authToken") || null
  );
  const loggedUserId = useSelector(getLoggedUserId);

  setAuthorizationHeader(accessToken);

  useEffect(() => {
    if (loggedUserId) {
      const token =
        storage.get("authToken") || sessionStorage.getItem("authToken");
      if (token) {
        setAccessToken(token);
      } else {
        setAccessToken(null);
      }
    } else {
      setAccessToken(null);
    }
  }, [loggedUserId]);

  return (
    <>
      <SocketProvider authToken={accessToken}>
        <Layout>
          <RootRouter />
        </Layout>
      </SocketProvider>
    </>
  );
}

export default App;

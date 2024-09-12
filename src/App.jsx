import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const accessToken = storage.get("authToken");
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  return (
    <>
      <SocketProvider>
        <Layout>
          <RootRouter />
        </Layout>
      </SocketProvider>
    </>
  );
}

export default App;

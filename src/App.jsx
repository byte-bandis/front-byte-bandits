import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

function App() {
  const accessToken = storage.get("authToken");
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  return (
    <>
      <Layout>
        <RootRouter />
      </Layout>
    </>
  );
}

export default App;

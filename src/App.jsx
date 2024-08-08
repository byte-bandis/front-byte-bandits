import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
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
        <BreadCrumb />
        <RootRouter />
      </Layout>
    </>
  );
}

export default App;

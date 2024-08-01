import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./store/authSlice";
import { setAuthorizationHeader } from "./api/client";
import storage from "./utils/storage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = storage.get("authToken");
    if (token) {
      setAuthorizationHeader(token);
      dispatch(setAuth(true));
    }
  });

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

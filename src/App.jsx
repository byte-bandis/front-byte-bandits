import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
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

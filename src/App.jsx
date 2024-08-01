import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { authState } = useSelector((state) => state.authState);
  console.log("Esto es authState en app: ", authState);
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

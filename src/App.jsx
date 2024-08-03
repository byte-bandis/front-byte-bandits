import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import RootRouter from "./routes/RootRouter";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setRememberMe } from "./store/loginThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRememberMe());
  }, [dispatch]);

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

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ProductList from "../pages/product/ProductList";
import ProductView from "../pages/product/ProductView";
import Account from "../pages/customer/Account";
import DeleteAccount from "../pages/customer/DeleteAccount";
import LayoutAccount from "../pages/customer/LayoutAccount";
import Wishlist from "../pages/customer/Wishlist";
import { useSelector } from "react-redux";
import NewProductPage from "../pages/product/NewProductPage";
import TermsAndConditions from "../pages/register/TermsAndConditions";
import PrivacyPolicy from "../pages/register/PrivacyPolicy";
const RootRouter = () => {
  const isAuthenticated = useSelector((state) => state.authState.authState);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/"
          element={<h1>Home</h1>}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        ></Route>
        <Route
          path="/register"
          element={<RegisterPage />}
        ></Route>
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        ></Route>
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        ></Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          path=":userName"
          element={<LayoutAccount />}
        >
          <Route
            index
            element={<Account />}
          />
          <Route
            path="edit/:productId"
            element={<div>admin advert detail</div>}
          />
          <Route
            path="new"
            element={<NewProductPage />}
          />
          <Route
            path="whishlist"
            element={<Wishlist />}
          />
          <Route
            path="delete-account"
            element={<DeleteAccount />}
          />
        </Route>
        <Route
          path="/"
          element={<h1>Home</h1>}
        />
        <Route
          path="/product"
          element={<Outlet />}
        >
          <Route
            index
            element={<ProductList />}
          />
          <Route
            path=":productId"
            element={<ProductView />}
          />
        </Route>
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to="/404" />}
        />
      </Routes>
    );
  }
};

export default RootRouter;

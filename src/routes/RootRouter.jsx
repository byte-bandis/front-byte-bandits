import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ProductList from "../pages/product/ProductList";
import ProductView from "../pages/product/ProductView";
import DeleteMyAccount from "../pages/customer/DeleteMyAccount";
import LayoutAccount from "../pages/customer/LayoutAccount";
import Wishlist from "../pages/customer/Wishlist";
import NewProductPage from "../pages/product/NewProductPage";
import TermsAndConditions from "../pages/register/TermsAndConditions";
import PrivacyPolicy from "../pages/register/PrivacyPolicy";
import RequireAuth from "../pages/auth/components/RequireAuth";
/* import Profile from "../pages/customer/Profile";
 */
import LayoutProfile from "../pages/customer/LayoutProfile";
import PersonalInfo from "../pages/customer/PersonalInfo";
import UserPublicInfo from "../pages/customer/UserPublicInfo";
import Chats from "../pages/chat/Chats";
import Safety from "../pages/customer/Safety";
import SetRestorePasswordEmail from "../pages/auth/GetPasswordEmail";
import RestorePassword from "../pages/auth/RestorePassword";

const RootRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditions />}
      />
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />
      <Route
        path=":username"
        element={<UserPublicInfo />}
      />
      <Route
        path="/password-reminder"
        element={<SetRestorePasswordEmail />}
      />
      <Route
        path="/reset-password/:token"
        element={<RestorePassword />}
      />

      {/*Private routes*/}
      <Route
        path=":username"
        element={
          <RequireAuth>
            <LayoutAccount />
          </RequireAuth>
        }
      >
        <Route
          path="info"
          element={<LayoutProfile />}
        >
          <Route
            index
            element={<UserPublicInfo />}
          />
          <Route
            path="mydata"
            element={<PersonalInfo />}
          />
        </Route>
        <Route
          path="edit/:productId"
          element={<NewProductPage isEditMode />}
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
          element={<DeleteMyAccount />}
        />
        <Route
          path="chat"
          element={<Chats />}
        />
        <Route
          path="safety"
          element={<Safety />}
        />
      </Route>

      {/*Public routes*/}
      <Route
        path="/product"
        element={<Outlet />}
      >
        <Route
          index
          element={<ProductList />}
        />
        <Route
          path=":productId/*"
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
      <Route
        path="/"
        element={<ProductList $customMargin={"10px auto"} $customTop={"0"} />}
      />
    </Routes>
  );
};

export default RootRouter;

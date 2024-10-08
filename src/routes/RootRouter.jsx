import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ProductList from "../pages/product/ProductList";
import ProductView from "../pages/product/ProductView";
import LayoutAccount from "../pages/customer/LayoutAccount";
import Wishlist from "../pages/customer/Wishlist";
import NewProductPage from "../pages/product/NewProductPage";
import TermsAndConditions from "../pages/register/TermsAndConditions";
import PrivacyPolicy from "../pages/register/PrivacyPolicy";
import RequireAuth from "../pages/auth/components/RequireAuth";
import LayoutProfile from "../pages/customer/LayoutProfile";
import PersonalInfo from "../pages/customer/PersonalInfo";
import UserPublicInfo from "../pages/customer/UserPublicInfo";
import Chats from "../pages/chat/Chats";
import Safety from "../pages/customer/Safety";
import SetRestorePasswordEmail from "../pages/auth/GetPasswordEmail";
import RestorePassword from "../pages/auth/RestorePassword";
import ReservedProducts from "../pages/customer/transactions/ReservedProducts";
import AccountDeletion from "../pages/customer/myPersonalInfo/components/AccountDeletion";
import UserNameEmailUpdate from "../pages/customer/myPersonalInfo/components/UserNameEmailUpdate";
import SoldProducts from "../pages/customer/transactions/SoldProduct";
import PurchaseProducts from "../pages/customer/transactions/PurchaseProduct";

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path=":username" element={<UserPublicInfo />} />
      <Route path="/password-reminder" element={<SetRestorePasswordEmail />} />
      <Route path="/reset-password/:token" element={<RestorePassword />} />

      {/*Private routes*/}
      <Route
        path=":username"
        element={
          <RequireAuth>
            <LayoutAccount />
          </RequireAuth>
        }
      >
        <Route path="info" element={<LayoutProfile />}>
          <Route index element={<UserPublicInfo />} />
          <Route path="mydata" element={<PersonalInfo />} />
        </Route>
        <Route path="edit/:productId" element={<NewProductPage isEditMode />} />
        <Route path="new" element={<NewProductPage />} />
        <Route path="whishlist" element={<Wishlist />} />
        <Route path="delete-account" element={<AccountDeletion />} />
        <Route path="update-name-and-email" element={<UserNameEmailUpdate />} />
        <Route path="chat" element={<Chats />} />
        <Route path="safety" element={<Safety />} />
        <Route path="reservedProducts" element={<ReservedProducts />} />
        <Route path="soldProducts" element={<SoldProducts />} />
        <Route path="purchasedProducts" element={<PurchaseProducts />} />
      </Route>

      {/*Public routes*/}
      <Route path="/product" element={<Outlet />}>
        <Route index element={<ProductList />} />
        <Route path=":productId/*" element={<ProductView />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route
        path="/"
        element={<ProductList $customMargin={"10px auto"} $customTop={"0"} />}
      />
    </Routes>
  );
};

export default RootRouter;

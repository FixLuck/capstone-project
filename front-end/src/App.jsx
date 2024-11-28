import "./App.css";
import UserLogin from "./pages/shop-pages/UserLogin";
import SignUp from "./pages/shop-pages/SignUp";
import Profile from "./pages/shop-pages/Profile";
import RevenueStatistics from "./pages/admin-pages/RevenueStatistics";
import "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import WelcomeAdmin from "./pages/admin-pages/WelcomeAdmin.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/shop-pages/HomePage.jsx";
import ListShoePage from "./pages/shop-pages/ListShoePage.jsx";
import AddShoePage from "./pages/admin-pages/AddShoePage.jsx";
import OrderHistory from "./pages/shop-pages/OrderHistory.jsx";
import MemberManagemant from "./pages/admin-pages/MemberManagemant";
import RootLayoutAdmin from "./pages/RootLayoutAdmin";
import Cart from "./pages/shop-pages/Cart";
import DiscountManagement from "./pages/admin-pages/DiscountManagement";
import MemberOrderHistory from "./pages/admin-pages/MemberOrderHistory";
import DetailShoePage from "./pages/shop-pages/DetailShoePage";
import ListManageShoePage from "./pages/admin-pages/ListManageShoePage";
import Terms from "./pages/shop-pages/Terms";
import Privacy from "./pages/shop-pages/Privacy";
import CheckOut from "./pages/shop-pages/CheckOut";
import OrderDetailList from "./pages/shop-pages/OrderDetailList";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";
import { useEffect } from "react";
import AddDiscountPage from "./pages/admin-pages/AddDiscountPage";
import PaymentCallbackPage from "./pages/shop-pages/PaymentCallbackPage";
import ProfileUser from "./pages/shop-pages/ProfileUser";
import ShoePaging from "./pages/admin-pages/ShoePaging";
import MemberOrderHistoryDetail from "./pages/admin-pages/MemberOrderHistoryDetail";
import MemberOrderHistoryPaging from "./pages/admin-pages/MemberOrderHistoryPaging";
import DiscountPaging from "./pages/admin-pages/DiscountPaging";
import RevenuePage from "./pages/admin-pages/RevenuePage";

import MemberManagemantPaging from "./pages/admin-pages/MemberManagemantPaging";

import ForgotPassword from "./pages/shop-pages/ForgotPassword";
import VerifyCode from "./pages/shop-pages/VerifyCode";
import ResetPassword from "./pages/shop-pages/ResetPassword";
import FAQ from "./pages/shop-pages/FAQ";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shoes", element: <ListShoePage /> },
      { path: "shoes/:id", element: <DetailShoePage /> },
      { path: "cart", element: <Cart /> },

      { path: "login", element: <UserLogin /> },
      { path: "register", element: <SignUp /> },
      { path: "profile/me", element: <ProfileUser /> },
      { path: "faq", element: <FAQ /> },

      { path: "checkout", element: <CheckOut /> },
      { path: "checkout/payment-callback", element: <PaymentCallbackPage /> },
      { path: "logout", element: <UserLogin /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
      { path: "order-history", element: <OrderDetailList /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "forgot-password/verify-otp", element: <VerifyCode /> },
      { path: "forgot-password/reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/admin",
    element: <RootLayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomeAdmin /> },
      { path: "discount-management", element: <DiscountPaging /> },
      { path: "discount-management/new", element: <AddDiscountPage /> },
      { path: "member-order-history", element: <MemberOrderHistoryPaging /> },
      { path: "member-order-history/detail/:orderId/:userId", element: <MemberOrderHistoryDetail /> },
      { path: "account-management", element: <MemberManagemantPaging /> },
      { path: "revenue-stats", element: <RevenuePage /> },
      { path: "manage-shoes", element: <ShoePaging /> },
      { path: "manage-shoes/new", element: <AddShoePage /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.loginSuccess(token));
    }
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

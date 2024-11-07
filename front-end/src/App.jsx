import "./App.css";
import CheckOut from "./pages/shop-pages/CheckOut";
import UserLogin from "./pages/shop-pages/UserLogin";
import SignUp from "./pages/shop-pages/SignUp";
import Profile from "./pages/shop-pages/Profile";
import Notifacation from "./components/shop/Notifacation";
import RevenueStatistics from "./pages/admin-pages/RevenueStatistics";
import "./App.jsx";
import WelcomeAdmin from "./pages/admin-pages/WelcomeAdmin.jsx";
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/RootLayout.jsx';
import HomePage from './pages/shop-pages/HomePage.jsx';
import { RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import ListShoePage from './pages/shop-pages/ListShoePage.jsx';
import AddShoePage from './pages/admin-pages/AddShoePage.jsx';
import OrderHistory from "./pages/shop-pages/OrderHistory.jsx";
import MemberManagemant from "./pages/admin-pages/MemberManagemant";
import RootLayoutAdmin from "./pages/RootLayoutAdmin";
import RunningShoeForm from "./pages/admin-pages/RunningShoeForm";
import Cart from "./pages/shop-pages/Cart";
import RootLayoutManager from "./pages/RootLayoutManager";
import DiscountManagement from "./pages/manager-pages/DiscountManagement";
import MemberOrderHistory from "./pages/manager-pages/MemberOrderHistory";
import WelcomeManager from "./pages/manager-pages/WelcomeManager";
import { LogIn } from "lucide-react";

    const router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
        {index: true, element: <HomePage/>},
        {path: 'shoes', element: <ListShoePage/>},
        {path: 'add-shoe', element: <AddShoePage/>},
        {path: 'cart', element: <Cart/>},
        {path: 'order-history', element: <OrderHistory/>},
        {path: 'login', element: <UserLogin/>},
        {path: 'register', element: <SignUp/>},
        {path: 'users', element: <Profile/>},
        {path: 'orders', element: <OrderHistory/>},
        {path: 'checkout', element: <CheckOut/>},
        {path: 'logout', element: <UserLogin/>}
        ]
      },
      {
        path: "/admin",
        element: <RootLayoutAdmin/>,
        errorElement: <ErrorPage/>,
        children: [
        {index: true, element: <WelcomeAdmin/>},
        {path: 'discount-management', element: <DiscountManagement/>},
        {path: 'member-order-history', element: <MemberOrderHistory/>},
        {path: 'account-management', element: <MemberManagemant/>},
        {path: 'revenue-stats', element: <RevenueStatistics/>},
        {path: 'profile', element: <Profile/>},
          
        ]
      },
      {
        path: "/manager",
        element: <RootLayoutManager/>,
        errorElement: <ErrorPage/>,
        children: [
          {index: true, element: <WelcomeManager/>},
          {path: 'discount-management', element: <DiscountManagement/>},
          {path: 'member-order-history', element: <MemberOrderHistory/>},


          
        ]
      }
    ]
  );



function App() {
  return (
    


    <RouterProvider router={router}>

    </RouterProvider>


  )


}

export default App;

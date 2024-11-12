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
import RootLayoutManager from "./pages/RootLayoutManager";
import DiscountManagement from "./pages/admin-pages/DiscountManagement";
import MemberOrderHistory from "./pages/admin-pages/MemberOrderHistory";
import WelcomeManager from "./pages/manager-pages/WelcomeManager";
import DetailShoePage from "./pages/shop-pages/DetailShoePage";
import ListManageShoePage from "./pages/admin-pages/ListManageShoePage";

import CheckOut from "./pages/shop-pages/CheckOut";

<<<<<<< HEAD
=======

>>>>>>> c5fe8498f26602ab3a3818381d2626caf245f0d0
    const router = createBrowserRouter([
      {
        path: "/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
          
        {path: 'shoes', element: <ListShoePage/>},
        {path: 'shoes/:id', element: <DetailShoePage/>},
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

        {path: 'manage-shoes', element: <ListManageShoePage/>},
        {path: 'manage-shoes/new', element: <AddShoePage/>},

        {path: 'profile', element: <Profile/>},
          

import AddDiscountPage from "./pages/admin-pages/AddDiscountPage";



import CheckOut from "./pages/shop-pages/CheckOut";


        ]
      },
<<<<<<< HEAD
=======
    ]);


function App() {

  return (
    

    <RouterProvider router={router}>

    </RouterProvider>


  )



  

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shoes", element: <ListShoePage /> },
      { path: "shoes/:id", element: <DetailShoePage /> },
      { path: "add-shoe", element: <AddShoePage /> },
      { path: "cart", element: <Cart /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "login", element: <UserLogin /> },
      { path: "register", element: <SignUp /> },
      { path: "users", element: <Profile /> },
      { path: "orders", element: <OrderHistory /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "logout", element: <UserLogin /> },
    ],
  },
>>>>>>> c5fe8498f26602ab3a3818381d2626caf245f0d0
  {
    path: "/admin",
    element: <RootLayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomeAdmin /> },
      { path: 'discount-management', element: <DiscountManagement /> },
      { path: 'member-order-history', element: <MemberOrderHistory /> },
      { path: 'account-management', element: <MemberManagemant /> },
      { path: 'revenue-stats', element: <RevenueStatistics /> },
      { path: 'list-shoes', element: <ListManageShoePage /> },
      { path: 'profile', element: <Profile /> },
      {path: 'add-discount', element: <AddDiscountPage />}
    ]

  },
  {
    path: "/manager",
    element: <RootLayoutManager />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomeManager /> },
      { path: 'discount-management', element: <DiscountManagement /> },
      { path: 'member-order-history', element: <MemberOrderHistory /> },
      { path: 'add-discount', element: <AddDiscountPage /> },
    ]
  }
]);

function App() {
<<<<<<< HEAD
  return (
    

    <RouterProvider router={router}>

    </RouterProvider>


  )

=======
  return <RouterProvider router={router}></RouterProvider>;
>>>>>>> c5fe8498f26602ab3a3818381d2626caf245f0d0

}
export default App;

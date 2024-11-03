import "./App.css";
import "./App.jsx";

import WelcomeAdmin from "./pages/admin-pages/WelcomeAdmin.jsx";
import { createBrowserRouter } from 'react-router-dom';
// import AdminAside from './components/admin-com/AdminAside.jsx';
import DiscountManagement from "./pages/admin-pages/DiscountManagement.jsx";
import RootLayout from './pages/RootLayout.jsx';
import HomePage from './pages/shop-pages/HomePage.jsx';
import { RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import ListShoePage from './pages/shop-pages/ListShoePage.jsx';
import AddShoePage from './pages/admin-pages/AddShoePage.jsx';
import OrderHistory from "./pages/shop-pages/OrderHistory.jsx";
import MemberOrderHistory from "./pages/admin-pages/MemberOrderHistory.jsx";
import MemberManagemant from "./pages/admin-pages/MemberManagemant";
import RootLayoutAdmin from "./pages/RootLayoutAdmin";
import RunningShoeForm from "./pages/admin-pages/RunningShoeForm";
import Cart from "./pages/shop-pages/Cart";
// import RootLayoutManager from "./pages/RootLayoutManager";
// import DiscountManagement from "./pages/manager-pages/DiscountManagement";
// import MemberOrderHistory from "./pages/manager-pages/MemberOrderHistory";
// import WelcomeManager from "./pages/manager-pages/WelcomeManager";



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
      {path: 'manage-shoes', element: <AddShoePage/>},

      
    ]
  },
//   {
//     path: "/manager",
//     element: <RootLayoutManager/>,
//     errorElement: <ErrorPage/>,
//     children: [
//       {index: true, element: <WelcomeManager/>},
//       {path: 'discount-management', element: <DiscountManagement/>},
//       {path: 'member-order-history', element: <MemberOrderHistory/>},
//       {path: 'member-managemant', element: <MemberManagemant/>},  


      
//     ]
//   }
]
  );


function App() {
  return (
    

<OrderHistory></OrderHistory>
    // <RouterProvider router={router}>

    // </RouterProvider>


  )


}

export default App;
// phải để trg return

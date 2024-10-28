import "./App.css";
// import MemberManagemant from "./pages/admin-pages/MemberManagemant.jsx";
import WelcomeAdmin from "./pages/admin-pages/WelcomeAdmin.jsx";
// import { createBrowserRouter } from 'react-router-dom';
// import AdminAside from './components/admin-com/AdminAside.jsx';
// import DiscountManagement from "./pages/admin-pages/DiscountManagement.jsx";
// import RootLayout from './pages/RootLayout.jsx';
// import HomePage from './pages/shop-pages/HomePage.jsx';
// import { RouterProvider } from 'react-router-dom';
// import ErrorPage from './pages/ErrorPage.jsx';
// import ListShoePage from './pages/shop-pages/ListShoePage.jsx';
// import AddShoePage from './pages/admin-pages/AddShoePage.jsx';
import OrderHistory from "./pages/shop-pages/OrderHistory.jsx";
import MemberOrderHistory from "./pages/admin-pages/MemberOrderHistory.jsx";

import Cart from "./pages/shop-pages/Cart";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout/>,
//     errorElement: <ErrorPage/>,
//     children: [
//       {index: true, element: <HomePage/>},
//       {path: 'shoes', element: <ListShoePage/>},
//       {path: 'add-shoe', element: <AddShoePage/>},


//     ]
//   },
//   {
//     path: "/admin",
//     element: <WelcomeAdmin/>,
//     errorElement: <ErrorPage/>,
//     children: [
//       {path: 'discount-management', element: <DiscountManagement/>},
//       {path: 'member-order-history', element: <MemberOrderHistory/>},
      
//     ]
//   }

// ])


function App() {
  return (
    
<Cart/>





  );
}

export default App;
// phải để trg return
    // <RouterProvider router={router}>

    // </RouterProvider>
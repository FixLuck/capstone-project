<<<<<<< HEAD
import "./App.css";
<<<<<<< HEAD
import MemberManager from "@/MemberTable";
import MemberChange from "./MemberChange";
=======
>>>>>>> 5865d34bea58693a654f7c96fa4522eb9a9cc324
=======
import MemberManagemant from "@/MemberManagemant";
>>>>>>> dat-branch

import { createBrowserRouter } from 'react-router-dom';
import AdminAside from './components/admin-com/AdminAside.jsx';
// import ManagerAside from "./ManagerAside";
import DiscountManagement from "./pages/DiscountManagement.jsx";
import RootLayout from './pages/RootLayout.jsx';
import HomePage from './pages/shop-pages/HomePage.jsx';
// import DemoGrid from "./pages/DemoGrid.jsx";
import { RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.jsx';
import ListShoePage from './pages/shop-pages/ListShoePage.jsx';
import AddShoePage from './pages/admin-pages/AddShoePage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'shoes', element: <ListShoePage/>},
      {path: 'add-shoe', element: <AddShoePage/>}
    ]
  }
])
function App() {
  return (
<<<<<<< HEAD
    <div>
      <div className="mt-16 px-20">
        <MemberManagemant/>
      </div>
    </div>
=======
    // <ManagerAside/>
    // <AdminAside/>
    // <DiscountManagement/>
    // <DemoGrid/>
<<<<<<< HEAD
>>>>>>> 5865d34bea58693a654f7c96fa4522eb9a9cc324
=======

    <RouterProvider router={router}>

    </RouterProvider>
>>>>>>> d99303e7908fbd90c8ba0c8f965e8e9a04c1f09e
  );
}

export default App;

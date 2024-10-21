import "./App.css";
// import MemberManager from "@/MemberTable";
// import MemberChange from "./pages/admin-pages/MemberChange.jsx";

import MemberManagemant from "./pages/admin-pages/MemberManagemant.jsx";



// import AdminAside from './components/admin-com/AdminAside.jsx';
// import ManagerAside from "./ManagerAside";
// import DiscountManagement from "./pages/DiscountManagement.jsx";
// import DemoGrid from "./pages/DemoGrid.jsx";
import WelcomeAdmin from "./pages/admin-pages/WelcomeAdmin.jsx";

import { createBrowserRouter } from 'react-router-dom';
import AdminAside from './components/admin-com/AdminAside.jsx';
// import ManagerAside from "./ManagerAside";
import DiscountManagement from "./pages/admin-pages/DiscountManagement.jsx";
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
    <div>
      <div className="mt-16 px-20">
        <MemberManagemant/>
      </div>
      
    <WelcomeAdmin/>

<RouterProvider router={router}>

</RouterProvider>
    </div>
    // <ManagerAside/>
    // <AdminAside/>
    // <DiscountManagement/>
    // <DemoGrid/>


  );
}

export default App;

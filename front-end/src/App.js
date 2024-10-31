// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminAside from './components/admin-com/AdminAside'; // Adjust the path if necessary
import WelcomeAdmin from './pages/admin-pages/WelcomeAdmin'; // Adjust the path if necessary
import DiscountManagement from './pages/admin-pages/DiscountManagement'; // Adjust the path if necessary
import MemberManagemant from './pages/admin-pages/MemberManagemant';
import MemberOrderHistory from './pages/admin-pages/MemberOrderHistory';

const App = () => {
  return (
    <Router>
      <div>
        <AdminAside />
        <Routes>
          <Route path="/admin" element={<WelcomeAdmin />} errorElement={<ErrorPage />}>
            <Route index element={<WelcomeAdmin />} />
            <Route path="discount-management" element={<DiscountManagement />} />
            <Route path="member-order-history" element={<MemberOrderHistory />} />
            <Route path="account-management" element={<MemberManagemant />} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
};

export default App;

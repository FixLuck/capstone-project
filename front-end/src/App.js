// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminAside from './components/admin-com/AdminAside'; // Adjust the path if necessary
import WelcomeAdmin from './pages/admin-pages/WelcomeAdmin'; // Adjust the path if necessary
import DiscountManagement from './pages/admin-pages/DiscountManagement'; // Adjust the path if necessary

const App = () => {
  return (
    <Router>
      <div>
        <AdminAside />
        <Routes>
          <Route path="/" element={<WelcomeAdmin />} />
          <Route path="/discount-management" element={<DiscountManagement />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

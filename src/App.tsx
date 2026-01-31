import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/common/Navbar';
import Home from './pages/public/Home';
import ProductDetail from './pages/public/ProductDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/common/ProtectedRoute';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <footer className="footer-simple">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} EngraverPro. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

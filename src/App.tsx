import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/common/Navbar';
import Home from './pages/public/Home';
import ProductDetail from './pages/public/ProductDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
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
              <Route path="/admin" element={<AdminDashboard />} />
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

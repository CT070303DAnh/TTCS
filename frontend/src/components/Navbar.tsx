import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              Diabetes Diagnosis
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                <Link to="/diagnosis" className="text-gray-700 hover:text-primary-600">
                  Chẩn đoán
                </Link>
                <Link to="/history" className="text-gray-700 hover:text-primary-600">
                  Lịch sử
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Xin chào, {user?.fullName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary text-sm"
                  >
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

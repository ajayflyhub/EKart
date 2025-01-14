import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Badge } from "antd";

const Header = ({ onNavigate, onLogout, cartItemCount = 10 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navigateFn = onNavigate || navigate;
  const logoutFn = onLogout || logout;

  const handleLogout = () => {
    logoutFn();
    navigateFn("/login");
  };

  const renderCustomerLinks = () => (
    <>
      <Link to="/products" className="hover:underline">
        Products
      </Link>
      <Link to="/cart" className="hover:underline">
        Cart
      </Link>
      <Link to="/orders" className="hover:underline">
        My Orders
      </Link>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <Link to="/admin/dashboard" className="hover:underline">
        Dashboard
      </Link>
      <Link to="/admin/manage-products" className="hover:underline">
        Manage Products
      </Link>
      <Link to="/admin/manage-customers" className="hover:underline">
        Manage Customers
      </Link>
    </>
  );

  const renderNavigationLinks = () => {
    if (user && user.role === "customer") return renderCustomerLinks();
    if (user && user.role === "admin") return renderAdminLinks();
    return null;
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="px-10 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-[#364d79]">
          <Link to="/">E-kart</Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 text-[#364d79] font-bold">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {renderNavigationLinks()}
          </nav>

          {/* Cart */}
          <Link to="/cart" className="relative mr-2">
            <div className="scale-75">
              <Badge count={cartItemCount} offset={[10, 0]} showZero>
                <span className="material-icons text-2xl text-[#364d79]">
                  shopping_cart
                </span>
              </Badge>
            </div>
          </Link>

          {/* User Authentication */}
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

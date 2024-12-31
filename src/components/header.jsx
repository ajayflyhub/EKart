import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Badge } from "antd";

const Header = ({ onNavigate, onLogout, cartItemCount = 0 }) => {
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
      <Link to="/customer/products" className="hover:underline">
        Products
      </Link>
      <Link to="/customer/cart" className="hover:underline">
        Cart
      </Link>
      <Link to="/customer/orders" className="hover:underline">
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
    <div className="px-10 py-2 flex shadow-md w-full justify-between bg-white top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-[#364d79]">
        <Link to="/">E-Cart</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 text-[#364d79] font-bold">
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {renderNavigationLinks()}
        </nav>

        {/* Cart Icon with Badge */}
        {/* {user && user.role === "customer" && ( */}
        <Link to="/customer/cart" className="relative">
          <div className="scale-75">
            {" "}
            {/* Reduces the size */}
            <Badge count={cartItemCount} offset={[10, 0]} showZero>
              <span className="material-icons text-2xl text-[#364d79]">
                shopping_cart
              </span>
            </Badge>
          </div>
        </Link>

        {/* )} */}

        {/* Auth Buttons */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="py-1 px-4 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/Actions/userActions";
import { fetchCart } from "../redux/Actions/cartActions";

const Header = ({ onNavigate, onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const state = useSelector((state) => state);
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;
      dispatch(fetchCart(userId));
      dispatch(fetchUser(userId));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    window.location.href = "/";
  };

  useEffect(() => {
    console.log("userdata", user);
    console.log("cartItems", state.cart.cartItems);
  }, [user, state]);

  const renderCustomerLinks = () => (
    <>
      <Link to="/products" className="hover:underline">
        Products
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
    <div className="fixed top-0 bg-white shadow-md w-full z-10">
      <div className="px-10 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-[#364d79]">
          <Link to="/">E-kart</Link>
        </div>

        <div className="flex items-center gap-4 text-[#364d79] font-bold">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {renderNavigationLinks()}
          </nav>

          {/* Cart */}
          {user && (
            <div className="flex gap-2">
              <Link to="/cart" className="relative mr-2">
                <div className="scale-75">
                  <Badge
                    count={state.cart.cartItems.length}
                    offset={[10, 0]}
                    showZero
                  >
                    <span className="material-icons text-2xl text-[#364d79]">
                      shopping_cart
                    </span>
                  </Badge>
                </div>
              </Link>

              <Link to="/dashboard" className="relative mr-2">
                <div className="scale-85">
                  <Badge>
                    <span className="material-icons text-2xl text-[#364d79]">
                      person
                    </span>
                  </Badge>
                </div>
              </Link>
            </div>
          )}

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

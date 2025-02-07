import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Tooltip } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/Actions/userActions";
import { fetchCart } from "../redux/Actions/cartActions";
import { getWalletAsync } from "../redux/Actions/walletActions";
import ekartLogo from "../assets/logo/logoekart.png";

const Header = ({ onNavigate, onLogout }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const wallet = useSelector((state) => state?.wallet?.wallet);
  const state = useSelector((state) => state);
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;
      dispatch(fetchCart(userId));
      dispatch(fetchUser(userId));
      dispatch(getWalletAsync(userId));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    window.location.href = "/";
  };

  useEffect(() => {
    console.log("wallet,wallet", wallet);
  }, [wallet]);

  const renderCustomerLinks = () => (
    <>
      <Link to="/products" className="hover:underline">
        Products
      </Link>
      {user?.role !== "operations" && (
        <Link to="/orders" className="hover:underline">
          My Orders
        </Link>
      )}
    </>
  );

  const renderAdminLinks = () => (
    <>
      <Link to="/admin/dashboard" className="hover:underline">
        Dashboard
      </Link>
      <Link to="/products" className="hover:underline">
        Products
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
    if (token) return renderCustomerLinks();
    return null;
  };

  // Function to display cart products list
  const renderCartItems = () => {
    const cartItems = state.cart.cartItems || [];
    console.log("itersd", cartItems);
    return cartItems.map((item, index) => (
      <div
        key={index}
        className="tooltip-item flex justify-between border-b py-1"
      >
        <span className="text-[#364d79] font-semibold">
          {item?.product?.name}
        </span>
        <span className="ml-4 text-[#364d79] font-semibold">
          x {item?.quantity}
        </span>
      </div>
    ));
  };

  useEffect(() => {
    console.log("state12312", state);
  }, [state]);

  return (
    <div className="fixed top-0 bg-white shadow-md w-full z-10">
      <div className="px-10 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/"  className="text-xl font-bold text-[#364d79]">
          <img src={ekartLogo} alt="EKART" className="w-[45px] h-[35px]" />
        </Link>

        <div className="flex items-center gap-4 text-[#364d79] font-bold">
          {/* <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {renderNavigationLinks()}
          </nav> */}

          {/* Wallet Balance */}
          {user && (
            <div className="flex gap-4 items-center">
              {user?.role !== "operations" && (
                <Tooltip
                  title={
                    user ? (
                      <div className="text-[#364d79] font-bold text-center">
                        <p className="text-lg font-extrabold">EKPay</p>
                        <p className="text-sm">
                          Wallet Balance:{" "}
                          <span className="font-semibold">
                            ₹
                            {new Intl.NumberFormat("en-IN").format(
                              wallet?.balance ?? 0
                            )}
                          </span>
                        </p>
                        <Link
                          to="/wallet"
                          className="text-blue-600 hover:underline text-sm font-medium"
                        >
                          Go to Wallet
                        </Link>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )
                  }
                  color="#f7f7f7"
                >
                  <span className="material-icons text-2xl text-[#364d79]">
                    account_balance_wallet
                  </span>
                </Tooltip>
              )}

              {/* Cart */}
              {user?.role !== "operations" && (
                <Tooltip
                  title={
                    state.cart.cartItems && state.cart.cartItems.length > 0 ? (
                      <div className="cart-items-list p-2">
                        <h3 className="border-b pb-1 text-[#364d79] font-bold">
                          Items in Cart
                        </h3>
                        <div className="max-h-[200px] overflow-y-auto">
                          {renderCartItems()}
                        </div>
                        <div className="border-t pt-2">
                          <Link
                            to="/cart"
                            className="text-blue-500 block text-center"
                          >
                            Go to Cart
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[#364d79] font-bold">
                        Your cart is empty
                      </p>
                    )
                  }
                  color="#f7f7f7"
                >
                  <div className="scale-75">
                    <Badge
                      count={
                        Array.isArray(state?.cart?.cartItems) &&
                        state.cart.cartItems.length > 0
                          ? state.cart.cartItems.reduce(
                              (total, item) => total + item.quantity,
                              0
                            ) // Sum of quantities
                          : 0
                      }
                      offset={[10, 0]}
                      showZero
                    >
                      <span className="material-icons text-2xl text-[#364d79]">
                        shopping_cart
                      </span>
                    </Badge>
                  </div>
                </Tooltip>
              )}

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
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

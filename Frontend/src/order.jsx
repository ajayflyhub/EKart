import React, { useEffect } from "react";
import ProductCard from "./components/productCard"; // Adjust the path as needed
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./redux/Actions/orderActions";
import { SmileOutlined } from "@ant-design/icons";
const OrderPage = () => {
  const token = Cookies.get("jwtToken");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken.userId;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [userId, dispatch]);

  return (
    <div className="container flex-col grid-cols-3 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div
        className={`grid grid-cols-1 ${
          orders.length > 0 && "md:grid-cols-2 lg:grid-cols-3"
        } gap-6`}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <ProductCard key={order.id} item={order} pageType="order" />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-600 py-12">
            <SmileOutlined className="text-blue-500 text-5xl mb-4" />
            <h2 className="text-xl font-semibold">No Orders Found</h2>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Please place an order to see your orders.
            </p>
            <a
              href="/products"
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-all"
            >
              Shop Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;

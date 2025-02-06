import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";
import { fetchProductById } from "./redux/Actions/productActions";
import {
  addToCartAsync,
  removeFromCartAsync,
  updateCartAsync,
} from "./redux/Actions/cartActions";
import Magnifier from "react-magnifier";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state?.products?.product?.[0] || null);
  const user = useSelector((state) => state?.user?.user);
  const cart = useSelector((state) => state?.cart?.cartItems);

  console.log("xfzxcz", product);

  const currentCartItem = cart?.find(
    (cartItem) => cartItem?.productId === Number(id)
  );
  const [quantity, setQuantity] = useState(currentCartItem?.quantity || 1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentCartItem) {
      setQuantity(currentCartItem?.quantity);
    }
  }, [currentCartItem]);

  const handleAddToCart = () => {
    if (user && id) {
      dispatch(addToCartAsync(Number(id), user?.id, quantity));
    }
  };

  const handleRemoveFromCart = () => {
    if (user && id) {
      dispatch(removeFromCartAsync(Number(id), user?.id));
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
    if (currentCartItem) {
      dispatch(
        updateCartAsync(user?.id, { ...currentCartItem, quantity: value })
      );
    }
  };

  const isInCart = !!currentCartItem;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container flex-col mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative w-full max-w-md mx-auto">
            <Magnifier
              src={product?.imageURL}
              width={300}
              height={400}
              zoomFactor={2} // Adjust zoom level
            />
          </div>

          <div className="space-y-6 items-center flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name || "Loading..."}
            </h1>
            <p className="text-2xl font-semibold text-gray-700">
              {product?.price || "N/A"}₹
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product?.description || "No description available."}
            </p>

            {/* <StarRating rating={product?.rating || 0} /> */}
            {user?.role !== "operations" && (
              <>
                {isInCart ? (
                  <div className="mt-4 flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                    />
                    <button
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center"
                      onClick={handleRemoveFromCart}
                    >
                      <FaTrash className="mr-2" /> Remove from Cart
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;

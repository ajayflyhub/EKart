import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./components/productCard";
import { fetchProducts } from "./redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  removeFromCartAsync,
} from "./redux/Actions/cartActions";

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const viewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-12">
        {filteredProducts.map((item) => (
          <ProductCard item={item} />
        ))}
      </div>

      {/* <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
            <th className="border border-gray-300 px-4 py-2">Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2 w-[20px] max-h-[50px]">
                <img src={product.imageLink} alt={product.name}></img>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => viewDetails(product.id)}
                  className="text-blue-500 underline"
                >
                  View Details
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ProductPage;

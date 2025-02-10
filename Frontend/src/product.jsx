import React, { useEffect, useState } from "react";
import ProductCard from "./components/productCard";
import { fetchProducts } from "./redux/Actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/Actions/cartActions";

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.user.user);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
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
        {filteredProducts?.map((item) => (
          <ProductCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

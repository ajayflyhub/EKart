import React, { useEffect } from "react";
import { Carousel } from "antd";
import CardGrid from "./components/cards";
import { BannerImages } from "./assets/mockData";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/reducers/productReducer";

const Home = () => {
  const contentStyle = {
    margin: 0,
    width: "100%",
    height: "400px",
    objectFit: "cover", // Prevents stretching
    display: "block",
  };
  const onChange = (currentSlide) => {
    console.log(`Carousel slide changed to: ${currentSlide}`);
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("products",products)    
  },[products])


  return (
    <div className="bg-blue-100">
      <Carousel afterChange={onChange} autoplaySpeed={2000} autoplay={true}>
        {BannerImages.map((image) => {
          return (
            <div className="flex flex-col">
              <img style={contentStyle} src={image.imageLink} alt="" />
            </div>
          );
        })}
      </Carousel>

      <div className="py-10 px-6 bg-blue-50">
        <h1 className="font-bold text-4xl text-center mb-8">Features</h1>

        <CardGrid>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">ADD TO CART</h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">
              REMOVE FROM CART
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">
              UPDATE THE CART
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">
              USER REGISTRATION AND PERMISSIONS
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-center">
              ADMIN PERMISSIONS
            </h2>
          </div>
        </CardGrid>
      </div>

      <div className="py-10 px-6 bg-blue-50">
        <h1 className="font-bold text-4xl text-center mb-8">
          USER REGISTRATION AND LOGIN
        </h1>
        <CardGrid>
          <a
            href="/login"
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold text-center">USER LOGIN</h2>
          </a>
          <a
            href="/register"
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold text-center">
              USER REGISTRATION
            </h2>
          </a>
        </CardGrid>
      </div>
      {/* Other Homepage Content */}
    </div>
  );
};

export default Home;

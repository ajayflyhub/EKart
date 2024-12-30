import React from "react";
import { Carousel } from "antd";
import CardGrid from "./components/cards";

const Home = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "250px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    display: "flex",
    justifyContent: "center",
  };

  const onChange = (currentSlide: number) => {
    console.log(`Carousel slide changed to: ${currentSlide}`);
  };

  return (
    <div>
      {/* Carousel */}
      <Carousel afterChange={onChange}>
        <div>
          <h1 style={contentStyle}>WELCOME TO EKART</h1>
        </div>
        <div>
          <h3 style={contentStyle}>BUY PRODUCTS</h3>
        </div>
        <div>
          <h3 style={contentStyle}>CREATE ACCOUNTS</h3>
        </div>
        <div>
          <h3 style={contentStyle}>THANK YOU</h3>
        </div>
      </Carousel>

      <div className="py-10 px-6 bg-gray-100">
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

      {/* Other Homepage Content */}
    </div>
  );
};

export default Home;

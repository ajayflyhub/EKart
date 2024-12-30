import React from "react";
import { Carousel } from "antd";

const Home = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "250px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    display:"flex",
    justifyContent:'center'
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

      <div>
      <h1 style={contentStyle}>FEATURES</h1>
      <div className="">
        <div id="content">
            <img src="" alt=""></img>
        </div>
      </div>
      </div>

      {/* Other Homepage Content */}
    </div>
  );
};

export default Home;

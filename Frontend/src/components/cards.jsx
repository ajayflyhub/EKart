import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS

const CardGrid = ({ children }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with custom duration
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-6">
      {React.Children.map(children, (child, index) => {
        return (
          <div data-aos="fade-up" data-aos-delay={`${index * 100}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default CardGrid;

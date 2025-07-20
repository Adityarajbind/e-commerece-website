import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "../data";
import CategoryComponent from "../components/CategoryComponent";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Adjust based on screen size
  slidesToScroll: 1,
  arrows: false,
};
const Category = () => {
  const Navigate = useNavigate();

const handleToggle = () => {
  setfilter((prev) => !prev);
};

  
  const sliderRef = useRef(null);
  const [filter, setfilter] = useState(false);
  const [priceValue, setPriceValue] = useState(50);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setselectedSize] = useState("Small");
  const colors = [
    "green",
    "red",
    "blue",
    "yellow",
    "pink",
    "orange",
    "purple",
    "#00CFFF",
    "white",
    "black",
  ];

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };
  const { name } = useParams();
  return (
    <>
      <Header />
      <main className="category-page flex items-center justify-around min-h-screen  dark:bg-[var(--bg-section)] w-full sm:px-5 px-2  sm:pt-5 pt-1 relative ">
        <div className="ilter w-1/4 border border-gray-400 rounded-3xl m-2  p-5 flex flex-col items-center justify-center self-start max-[768px]:hidden">
          <div className="text-xl font-semibold flex justify-between items-center w-full pb-3 mb-3 border-b border-gray-400">
            <span>Filter</span>
            <img
              src="/icons/filter.svg"
              alt="filter"
              className="invert-[50%] dark:invert"
            />
          </div>

          {/* Categories */}
          <div className="w-full space-y-1 pb-4  border-b border-gray-400 text-gray-700 dark:text-white ">
            {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center cursor-pointer hover:font-medium"
              >
                <span>{item}</span>
                <span className="text-lg">{">"}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Price</span>{" "}
              <span>{priceValue}$</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              className="w-full h-2 rounded-lg cursor-pointer"
              style={{
                backgroundColor: "#f0f0f0", // for older browsers
                accentColor: "black", // for modern browsers
              }}
              id="priceRange"
              value={priceValue}
              onChange={handlePriceChange}
            />

            <div className="flex justify-between text-sm mt-1">
              <span>$50</span>
              <span>$200</span>
            </div>
          </div>

          {/* Colors */}
          <div className="w-full mt-6 pb-4 border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Colors</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer relative flex items-center justify-center ${
                    color === "white" ? "border border-gray-400" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <span
                      className={`text-[10px] font-bold ${
                        color === "white" ? "text-black" : "text-white"
                      } bg-[#00000046] w-full h-full rounded-full flex items-center justify-center`}
                    >
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Size</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "XX Small",
                "X Small",
                "Small",
                "Medium",
                "Large",
                "X-Large",
                "2X-Large",
                "3X-Large",
                "4X-Large",
              ].map((size) => (
                <div
                  key={size}
                  className={`px-5 py-3 text-sm rounded-3xl bg-[#f0f0f0] text-gray-700  cursor-pointer ${
                    size === selectedSize ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setselectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Dress Style</span>
            </div>
            <div className="space-y-1 text-gray-700 dark:text-white text-sm">
              {["Casual", "Formal", "Party", "Gym"].map((style) => (
                <div
                  key={style}
                  className="flex justify-between items-center cursor-pointer hover:font-medium"
                  onClick={() => Navigate(`/category/${style.toLowerCase()}`)}
                >
                  <span>{style}</span>
                  <span className="text-lg">{">"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filter Button */}
          <button className="mt-8 bg-black text-white w-full py-2 rounded-full hover:bg-gray-800 transition">
            Apply Filter
          </button>
        </div>

        <div className="products flex flex-col items-center md:w-3/4 w-full ">
          <div className={`category-header flex items-center justify-between w-full `}>
            <h1 className="category-title sm:ml-2 mx-0 text-3xl max-[450px]:text-2xl capitalize font-semibold ">
              {name}
            </h1>
            <span className="text-gray-500 dark:text-gray-400 text-sm self-end mb-[2px] md:m-0 mr-auto">
              Showing 1-10 of 100
              <span className="sm:inline hidden">Products Sort by: </span>
              <select
                name="order"
                id="order"
                className="bg-transparent text-black outline-none font-semibold text-[1rem] sm:inline hidden"
              >
                <option value="most_popular">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
            </span>
            <div className="md:hidden flex items-center justify-center gap-2 dark:bg-black bg-[#f0f0f0] h-7 w-7 rounded-full">
              {/* filter button */}
              <img
                src="/icons/filter.svg"
                alt="filter"
                className="invert-[50%] dark:invert cursor-pointer w-[60%] h-[60%] "
                onClick={handleToggle}   
              />
            </div>
          </div>
          <Slider {...sliderSettings} ref={sliderRef} className="w-full ">
            <CategoryComponent item={products} />
            <CategoryComponent item={products} />
            <CategoryComponent item={products} />
            <CategoryComponent item={products} />
          </Slider>
          <div className="w-[98%] bg-[#f0f0f0] h-[1px] mb-2 mx-2"></div>
          <div className="flex w-full justify-between items-center sm:px-2 px-1 mb-2">
            <button
              className="flex justify-center gap-2  border dark:text-white px-4 py-2 rounded-xl  hover:bg-gray-800 transition"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              {" "}
              <img
                className="dark:invert"
                src="/icons/left.svg"
                alt="previous"
              />
              previous
            </button>
            <button
              className="flex justify-center gap-2 border dark:text-white px-4 py-2 rounded-xl  hover:bg-gray-800 transition"
              onClick={() => sliderRef.current?.slickNext()}
            >
              next{" "}
              <img className="dark:invert" src="/icons/right.svg" alt="next" />
            </button>
          </div>
        </div>

      {filter && (
        <div className={`filter max-w-[425px] border border-gray-400 rounded-3xl m-2  p-5 flex flex-col items-center justify-center self-start transition-all duration-500 ease-linear ${
              filter ? "animate-slide-in" : "animate-slide-out"
            } absolute top-11  left-0 bg-[#171717] z-20`}>
          <div className="text-xl font-semibold flex justify-between items-center w-full pb-3 mb-3 border-b border-gray-400">
            <span>Filter</span>
            <img
              src="/icons/filter.svg"
              alt="filter"
              className="invert-[50%] dark:invert cursor-pointer"
              onClick={handleToggle} 
            />
          </div>

          {/* Categories */}
          <div className="w-full space-y-1 pb-4  border-b border-gray-400 text-gray-700 dark:text-white ">
            {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center cursor-pointer hover:font-medium"
              >
                <span>{item}</span>
                <span className="text-lg">{">"}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Price</span>{" "}
              <span>{priceValue}$</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              className="w-full h-2 rounded-lg cursor-pointer"
              style={{
                backgroundColor: "#f0f0f0", // for older browsers
                accentColor: "black", // for modern browsers
              }}
              id="priceRange"
              value={priceValue}
              onChange={handlePriceChange}
            />

            <div className="flex justify-between text-sm mt-1">
              <span>$50</span>
              <span>$200</span>
            </div>
          </div>

          {/* Colors */}
          <div className="w-full mt-6 pb-4 border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Colors</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer relative flex items-center justify-center ${
                    color === "white" ? "border border-gray-400" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <span
                      className={`text-[10px] font-bold ${
                        color === "white" ? "text-black" : "text-white"
                      } bg-[#00000046] w-full h-full rounded-full flex items-center justify-center`}
                    >
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Sizes */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Size</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "XX Small",
                "X Small",
                "Small",
                "Medium",
                "Large",
                "X-Large",
                "2X-Large",
                "3X-Large",
                "4X-Large",
              ].map((size) => (
                <div
                  key={size}
                  className={`px-5 py-3 text-sm rounded-3xl bg-[#f0f0f0] text-gray-700  cursor-pointer ${
                    size === selectedSize ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setselectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="w-full mt-6 pb-4  border-b border-gray-400">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-xl">Dress Style</span>
            </div>
            <div className="space-y-1 text-gray-700 dark:text-white text-sm">
              {["Casual", "Formal", "Party", "Gym"].map((style) => (
                <div
                  key={style}
                  className="flex justify-between items-center cursor-pointer hover:font-medium"
                  onClick={() => Navigate(`/category/${style.toLowerCase()}`)}
                >
                  <span>{style}</span>
                  <span className="text-lg">{">"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filter Button */}
          <button className="mt-8 bg-black text-white w-full py-2 rounded-full hover:bg-gray-800 transition">
            Apply Filter
          </button>
        </div>
      )}
      </main>
      <Footer />
    </>
  );
};

export default Category;

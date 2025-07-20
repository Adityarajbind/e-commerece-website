import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./productCard";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Adjust based on screen size
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductSection = ({ title, products }) => {
  const sliderRef = useRef(null);
  return (
    <>
      {/* product section */}
      <div className="product-section flex flex-col justify-center items-center w-full my-10 mx-auto relative">
        <h1 className="my-4 md:text-5xl text-3xl font-bold text-center">
          {title}
        </h1>
        <div className="flex w-full justify-between items-center sm:px-2 px-1 mb-2 absolute top-[50%] z-[15]  ">
          <button
            className="rounded-full opacity-50 hover:opacity-100 dark:bg-gray-900  transition"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img className="dark:invert" src="/icons/left.svg" alt="previous" />
          </button>
          <button
            className="rounded-full opacity-50 hover:opacity-100 dark:bg-gray-900  transition"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img className="dark:invert" src="/icons/right.svg" alt="next" />
          </button>
        </div>

        <div className="w-full max-w-[1200px] ">
          <Slider {...sliderSettings} ref={sliderRef}>
            {products.map((item) => (
              <div key={item.id} className="px-2">
                <ProductCard
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  rating={item.rating}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  discount={item.discount}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="view-more-btn mt-6 max-[425px]:w-full flex justify-center items-center">
          <button className="bg-white dark:bg-[var(--card-bg)] px-6 border py-2  rounded-full max-[425px]:w-[90%] hover:bg-gray-800 transition">
            View More
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductSection;

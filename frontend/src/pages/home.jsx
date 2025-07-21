import { useState } from "react";
import Header from "../components/header";
import { products, reviews } from "../data";
const sponsors = ["versace", "zara", "gucci", "prada", "ck"];
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommentCard from "../components/commentCard";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";
import { useNavigate } from "react-router-dom";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Adjust based on screen size
  slidesToScroll: 4,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
// choose 8 products for the home page randomly
const getRandomProducts = (products, count = 8) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const featuredProducts1 = getRandomProducts(products);
const featuredProducts2 = getRandomProducts(products);
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="herosection flex justify-center items-center min-h-[90vh]  w-full sm:px-10 px-2 bg-[#f0f0f0] max-[769px]:flex-col dark:bg-[var(--bg-section)]">
        <div className="left w-[50%] max-[769px]:w-full">
          <h1 className="text-[2rem] md:text-5xl font-extrabold  leading-tight md:mb-6 my-4 ">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-gray-600 max-w-xl mb-8 md:text-[1rem] text-[0.8rem] dark:text-[var(--text-secondary)]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition max-[426px]:w-full"
            onClick={() => {
              navigate("/category/casual");
            }}
          >
            Shop Now
          </button>

          <div className="mt-12 flex  md:flex-row flex-wrap gap-8 max-[769px]:gap-4 h-auto w-full max-[769px]:grid grid-cols-2">
            <div className="max-[769px]:w-[100%] text-center">
              <span className="block text-2xl font-bold ">200+</span>
              <span className="text-gray-600 dark:text-[var(--text-secondary)]">
                International Brands
              </span>
            </div>
            <div className="max-[769px]:w-[100%] text-center">
              <span className="block text-2xl font-bold ">2,000+</span>
              <span className="text-gray-600 dark:text-[var(--text-secondary)]">
                High-Quality Products
              </span>
            </div>
            <div className="max-[769px]:w-[100%] col-start-1 col-end-3 text-center">
              <span className="block text-2xl font-bold ">30,000+</span>
              <span className="text-gray-600 dark:text-[var(--text-secondary)]">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        <div className="right h-full w-[50%] md:max-w-full max-[769px]:w-full flex justify-center items-center">
          <img
            src="/assets/Group 17 dark.png"
            alt="Fashion"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* sponsor  */}
      <div className="sponsor bg-black flex justify-evenly items-center gap-4 p-4 max-[769px]:flex-wrap">
        {sponsors.map((item) => (
          <div key={item} className="p-2">
            <img
              src={`/icons/${item}.png`}
              alt={item}
              className="h-8 max-[426px]:h-4"
            />
          </div>
        ))}
      </div>

      <ProductSection title={"NEW ARRIVALS"} products={featuredProducts1} />
      <ProductSection title={"TOP SELLING"} products={featuredProducts2} />

      {/* categories */}
      {/* add dark mode functionality  */}
      <div className="w-[94%] bg-[#f0f0f0] dark:bg-[var(--card-bg)] mx-auto mb-20 rounded-3xl min-[481px]:p-10 p-2">
        <h1 className="text-center md:text-[2.5rem] text-3xl font-bold my-10">
          BROWSE BY DRESS STYLE
        </h1>

        <div className="flex flex-col justify-center items-center  w-full h-full gap-3">
          <div className="flex justify-between items-center w-full md:h-[15rem] h-[10rem] max-[768px]:h-[21rem] max-[768px]:flex-col gap-4">
            <div
              className="rounded-2xl md:w-[33%] w-full h-full max-[768px]:h-1/2 bg-[url(/assets/image11.svg)] bg-size-[200%] bg-no-repeat bg-[position:80%_30%] cursor-pointer p-5 bg-white "
              onClick={() => navigate("/category/casual")}
            >
              <span className="md:text-2xl text-[1rem] dark:text-black">
                Casual
              </span>
            </div>
            <div
              className="rounded-2xl md:w-[66%] w-full h-full max-[768px]:h-1/2 bg-[url(/assets/image13.svg)] bg-size-[60%] bg-no-repeat bg-[position:80%_30%] cursor-pointer p-5 bg-white "
              onClick={() => navigate("/category/formal")}
            >
              <span className="md:text-2xl text-[1rem] dark:text-black">
                Formal
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center w-full md:h-[15rem] h-[10rem] max-[768px]:h-[21rem] max-[768px]:flex-col gap-4 flex-row-reverse">
            <div
              className="rounded-2xl md:w-[33%] w-full h-full max-[768px]:h-1/2 bg-[url(/assets/image14.svg)] bg-size-[100%] bg-no-repeat bg-[position:80%_30%] cursor-pointer p-5 bg-white "
              onClick={() => navigate("/category/gym")}
            >
              <span className="md:text-2xl text-[1rem] dark:text-black">
                Gym
              </span>
            </div>
            <div
              className="rounded-2xl md:w-[66%] w-full h-full max-[768px]:h-1/2 bg-[url(/assets/image12.svg)] bg-size-[60%] bg-no-repeat bg-[position:80%_30%] cursor-pointer p-5 bg-white "
              onClick={() => navigate("/category/party")}
            >
              <span className="md:text-2xl text-[1rem] dark:text-black">
                Party
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* reviews */}
      <h1 className="md:text-5xl text-3xl font-bold md:mx-10 md:mb-6 m-4">
        OUR HAPPY CUSTOMERS
      </h1>
      <div className="relative overflow-hidden mb-10">
        {/* Left blur */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r dark:from-[--card-bg] from-white to-transparent z-10" />

        {/* Right blur */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l dark:from-[--card-bg] from-white to-transparent z-10" />

        {/* Slider */}
        <Slider {...sliderSettings}>
          {reviews.map((review) => (
            <CommentCard
              key={review.id}
              name={review.name}
              comment={review.comment}
              stars={review.stars}
            />
          ))}
        </Slider>
      </div>
      <Footer />
    </>
  );
}

export default Home;

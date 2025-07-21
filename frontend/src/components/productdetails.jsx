import { useState, useContext } from "react";
import { Star, StarHalf, StarOff, Minus, Plus } from "lucide-react";
import { reviews } from "../data";
import { CartContext } from "../context/CartContext";
import Line from "./line";
import { useNavigate } from "react-router-dom";
import CommentCard from "./commentCard";

const ProductDetail = ({ product, id }) => {
  const [ProductAdded, setProductAdded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const [activeTab, setActiveTab] = useState("details");
  const Navigate = useNavigate();
  console.log(product);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [selectedShirt, setselectedShirt] = useState(product.image);
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const { title, price, image ,originalPrice} = product;
  return (
    <>
      <div className="flex justify-between items-center  w-full md:h-[80vh] md:flex-row flex-col">
        {/* Left Section: Product Image and Thumbnails */}

        <div className="md:w-[49%] w-full flex justify-evenly items-center h-full  md:flex-row flex-col-reverse gap-4">
          <div className="flex gap-2 md:flex-col md:w-[25%] md:h-full w-full h-[25%]">
            {product.thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`${
                  selectedShirt === thumb ? "border-2 border-gray-600" : ""
                } md:w-full md:h-1/3 h-full w-1/3 max-[768px]:aspect-square bg-no-repeat bg-cover rounded-2xl cursor-pointer`}
                style={{ backgroundImage: `url(${thumb})` }}
                onClick={() => setselectedShirt(thumb)}
              ></div>
            ))}
          </div>
          <div
            className="md:w-[70%] md:h-full w-full h-[75%] max-[768px]:aspect-[4/5] bg-no-repeat bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage: selectedShirt
                ? `url(${selectedShirt})`
                : `url(${product.image})`,
            }}
          ></div>
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-[49%] w-full px-2 text-[0.9rem] ">
          <h1 className="text-3xl font-extrabold mb-2 uppercase ">
            {product.title}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex gap-1">
              {[...Array(fullStars)].map((_, i) => (
                <Star
                  key={`full-${i}`}
                  size={18}
                  className="text-yellow-500 fill-yellow-500"
                />
              ))}
              {hasHalfStar && (
                <StarHalf
                  size={18}
                  className="text-yellow-500 fill-yellow-500"
                />
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <StarOff
                  key={`empty-${i}`}
                  size={18}
                  className="text-yellow-500"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-[var(--text-secondary)]">
              {product.rating}/5
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-bold">${product.price}</span>
            <span className="line-through text-2xl font-bold text-gray-300 dark:text-[var(--text-secondary)]">
              ${product.originalPrice}
            </span>
            <span className="text-pink-500 bg-pink-100 dark:bg-[var(--discount-color)] dark:text-pink-100  font-semibold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          </div>

          <p className="text-gray-600 my-4 dark:text-[var(--text-secondary)]">
            {product.description}
          </p>
          <Line w={100} />
          {/* Colors */}
          <div className="my-4">
            <p className="font-medium mb-1 text-gray-600 dark:text-[var(--text-secondary)]">
              Select Color
            </p>
            <div className="flex gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-gray-600"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <Line w={100} />
          {/* Sizes */}
          <div className="my-4">
            <p className="font-medium mb-1">Choose Size</p>
            <div className="flex gap-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 max-[375px]:px-[0.3rem] max-[375px]:py-1 rounded-full ${
                    selectedSize === size
                      ? "bg-black text-[#ffffff]"
                      : "bg-[#dddddd] text-black border-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Line w={100} />
          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center bg-[#dddddd] dark:text-black rounded-full px-3 py-2 max-[375px]:px-2 max-[375px]:py-1">
              <button onClick={decrease} className="p-2">
                <Minus size={16} />
              </button>
              <span className="px-3">{quantity}</span>
              <button onClick={increase} className="p-2">
                <Plus size={16} />
              </button>
            </div>
            <button
              className="bg-black text-white px-12 py-3 max-[375px]:px-6 max-[375px]:py-[0.62rem] rounded-full hover:bg-gray-800 transition"
              onClick={() => {
                addToCart({ id, title, price, image, originalPrice, quantity });
                setProductAdded(true);
                setTimeout(() => setProductAdded(false), 2000);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 dark:border-none text-gray-600  text-sm font-medium">
          <button
            className={`px-6 py-3 max-[375px]:px-0 max-[375px]:py-3 w-1/2 text-[1rem] ${
              activeTab === "details"
                ? "border-b-2 border-black dark:border-white text-black dark:text-[var(--text-secondary)]"
                : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`px-6 py-3 max-[375px]:px-0 max-[375px]:py-3 w-1/2 text-[1rem] ${
              activeTab === "reviews"
                ? "border-b-2 border-black dark:border-white text-black dark:text-[var(--text-secondary)]"
                : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </button>
        </div>

        {/* Reviews */}
        {activeTab === "reviews" && (
          <>
            <div className="mt-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl flex items-center max-[425px]:text-[0.8rem]:">
                  All Reviews{" "}
                  <span className="text-gray-400 max-[425px]:text-sm">
                    ({reviews.length})
                  </span>
                </h2>
                <div className="flex items-center max-[425px]:gap-1 gap-3">
                  <button className="bg-gray-100 p-2 rounded-full dark:bg-black ">
                    <img
                      src="/icons/filter.png"
                      className="w-4 h-4 dark:invert"
                    />
                  </button>
                  <select className="bg-gray-100 dark:bg-black px-4 py-2 rounded-md text-sm outline-none max-[425px]:hidden">
                    <option>Latest</option>
                    <option>Oldest</option>
                  </select>
                  <button className="bg-black text-white px-4 py-2 max-[425px]:text-sm max-[425px]:p-2 rounded-full ">
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 gap-6 h-[80vh] overflow-y-scroll scrollbar-hide">
                {reviews.map((review, idx) => (
                  <CommentCard
                    key={idx}
                    stars={review.stars}
                    name={review.name}
                    comment={review.comment}
                    date={review.date}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 max-[425px]:w-full flex justify-center items-center">
              <button className="bg-white dark:bg-[var(--card-bg)] px-6 border border-[#b2b2b2] py-2  rounded-full max-[425px]:w-[90%] hover:bg-gray-800 transition">
                Load More Reviews
              </button>
            </div>
          </>
        )}

        {/* Product Details */}
        {activeTab === "details" && (
          <div className="mt-5 text-gray-600 dark:text-white">
            <p className="">{product.description}</p>
            <ul className="list-disc pl-5 mt-4 text-sm">
              <li>High-quality cotton material</li>
              <li>Available in multiple colors</li>
              <li>Machine washable</li>
              <li>Perfect for casual wear</li>
            </ul>
          </div>
        )}
      </div>
      {ProductAdded && (
        <div className="fixed bottom-2 left-2 rounded transform  z-50 bg-white dark:bg-[#3a3a3a]  shadow-lg px-3 py-1 flex items-center gap-4 animate-fade-in-up ">
          <span className="text-gray-700 dark:text-[var(--text-secondary)] text-sm">
            Product added to cart
          </span>
          <button
            onClick={()=> Navigate('/cart')}
            className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Go to Cart
          </button>
        </div>
      )}
    </>
  );
};

export default ProductDetail;

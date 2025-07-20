import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { products } from "../data";
import ProductDetail from "../components/productdetails";
import ProductSection from "../components/ProductSection";
import axios from "axios";

const getRandomProducts = (products, count = 8, id = null) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  if (id) {
    return shuffled.filter((product) => product.id !== id).slice(0, count);
  }
  return shuffled.slice(0, count);
};
const Product = () => {
  const { id } = useParams();
  const featuredProducts = getRandomProducts(products, 8, id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <>
      <Header />
      <main className="w-full md:px-10 px-2 py-6 dark:bg-[var(--card-bg)] flex flex-col items-center gap-6">
        {!product ? (
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-sm text-gray-400">Loading...</span>
          </div>
        ) : (
          <ProductDetail key={product.id} product={product} id={id} />
        )}
      </main>
      <ProductSection
        products={featuredProducts}
        title={"YOU MIGHT ALSO LIKE"}
      />
      <Footer />
    </>
  );
};

export default Product;

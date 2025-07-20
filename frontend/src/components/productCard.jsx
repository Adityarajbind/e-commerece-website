import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  image,
  name,
  rating,
  price,
  originalPrice,
  discount,
  varriant = "default"
}) => {
  const navigate = useNavigate();
  const iscompact = false;
  const variantStyles = {
    default: "h-[17rem]",
    compact: "max-[640px]:h-[10rem]",
  };
  if(varriant =="compact"){
    const iscompact = true;
  }
  // Function to generate star icons based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1 text-yellow-500">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star
              key={`full-${i}`}
              size={16}
              fill="currentColor"
              stroke="none"
            />
          ))}
        {halfStar && <StarHalf size={16} />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <StarOff key={`empty-${i}`} size={16} />
          ))}
      </div>
    );
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className={`w-full h-full bg-white dark:bg-[var(--card-bg)] sm:p-2 rounded-xl flex flex-col cursor-pointer ${varriant == 'default'?"p-2": ""}`}
    >
      <div
        className={`w-full h-[17rem] flex items-center justify-center rounded-xl bg-no-repeat bg-cover bg-center ${variantStyles[varriant]}`}
        
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="mt-4 flex flex-col justify-between my-auto">
        <h2 className="font-semibold text-sm">{name}</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-[var(--text-secondary)]">
          {renderStars(rating)}
          <span>{rating}/5</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-lg font-bold text-black dark:text-[var(--text-primary)] ${varriant == 'compact' ? "max-[360px]:text-[0.9rem]" : ""}`}>
            ${price}
          </span>
          {originalPrice && (
            <span className={`line-through text-gray-400 dark:text-[var(--text-secondary)] ${varriant == 'compact' ? "max-[360px]:text-[0.9rem]" : ""}`}>
              ${originalPrice}
            </span>
          )}
          {discount && (
            <span className={`text-pink-500 bg-pink-100 dark:bg-[var(--discount-color)] dark:text-pink-100 text-xs font-semibold sm:px-2 px-0.5 py-0.5 rounded-full ${iscompact?"text-[0.5rem]":""} ${varriant == 'compact' ? "max-[360px]:text-[0.5rem]" : ""}`}>
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

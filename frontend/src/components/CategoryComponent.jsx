import ProductCard from "./productCard";
import { useMediaQuery } from "react-responsive";
const getRandomProducts = (products, count = 8) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const CategoryComponent = ({ item }) => {

  // Use a media query hook 
  const isSmall = useMediaQuery({ maxWidth: 640 });

  // Limit number of products per slide
  const maxItems = isSmall ? 6 : 9;

  // Get random products for display
  const displayedItems = getRandomProducts(item, maxItems);

  return (
    <div className={`grid sm:gap-3 gap-2 ${isSmall ? "grid-cols-2 grid-rows-3" : "grid-cols-3 grid-rows-3"} w-full `}>
      {displayedItems.map((product, index) => (
        <ProductCard
          key={index}
          id={product.id}
          image={product.image}
          name={product.name}
          rating={product.rating}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          varriant="compact"          
        />
      ))}
    </div>
  );
};
export default CategoryComponent;
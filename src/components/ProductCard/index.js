import {
  faShoppingCart,
  faStar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startTransition } from "react";

const RatingStars = ({ rating }) => {
  return [...Array(5)].map((_, i) => (
    <FontAwesomeIcon
      key={i}
      icon={i < Math.floor(rating) ? faStar : faStarRegular}
      className="text-xs"
    />
  ));
};

const ProductPrice = ({ product }) => {
  if (product.discountPrice) {
    return (
      <>
        <span className="text-sm font-semibold text-[#770504]">
          ${product.discountPrice.toFixed(2)}
        </span>
        <span className="ml-1 text-xs text-gray-400 line-through">
          ${product.price.toFixed(2)}
        </span>
      </>
    );
  }
  return (
    <span className="text-sm font-semibold text-gray-800">
      ${product.price.toFixed(2)}
    </span>
  );
};

const ProductCard = ({ product, navigate, handleAddToCart }) => (
  <div className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="relative pt-[75%]">
      <img
        src={product.image}
        onClick={() => {
          startTransition(() => {
            navigate(`/product/${product.id}`);
          });
        }}
        alt={product.name}
        className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
        loading="lazy"
      />
      <button className="absolute top-1.5 right-1.5 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
        <FontAwesomeIcon
          icon={faHeart}
          className="text-gray-400 hover:text-red-500 text-xs"
        />
      </button>
      {product.discountPrice && (
        <span className="absolute top-1.5 left-1.5 bg-[#770504] text-white text-[10px] px-1.5 py-0.5 rounded">
          Sale
        </span>
      )}
    </div>
    <div className="p-3">
      <h3
        onClick={() => {
          startTransition(() => {
            navigate(`/product/${product.id}`);
          });
        }}
        className="font-medium cursor-pointer text-sm h-10 text-gray-800 mb-1 line-clamp-2"
      >
        {product.name}
      </h3>
      <div className="flex items-center mb-1">
        <div className="flex text-amber-400 mr-1">
          <RatingStars rating={product.rating} />
        </div>
        <span className="text-[10px] text-gray-500">({product.rating})</span>
      </div>
      <div className="flex items-center mb-2">
        <ProductPrice product={product} />
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="w-full bg-[#770504] hover:bg-[#5a0403] text-white py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="mr-1 text-xs" />
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;

import { faShoppingCart, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
        <span className="text-lg font-bold text-[#770504]">
          ${product.discountPrice.toFixed(2)}
        </span>
        <span className="ml-2 text-sm text-gray-400 line-through">
          ${product.price.toFixed(2)}
        </span>
      </>
    );
  }
  return (
    <span className="text-lg font-bold text-gray-800">
      ${product.price.toFixed(2)}
    </span>
  );
};



const ProductCard = ({ product, navigate, handleAddToCart }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="relative pt-[100%]">
      <img
        src={product.image}
        onClick={() => navigate(`/product/${product.id}`)}
        alt={product.name}
        className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
        loading="lazy"
      />
      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
        <FontAwesomeIcon icon={faHeart} className="text-gray-400 hover:text-red-500" />
      </button>
      {product.discountPrice && (
        <span className="absolute top-2 left-2 bg-[#770504] text-white text-xs px-2 py-1 rounded">
          Sale
        </span>
      )}
    </div>
    <div className="p-4">
      <h3
        onClick={() => navigate(`/product/${product.id}`)}
        className="font-medium cursor-pointer text-gray-800 mb-1 line-clamp-2"
      >
        {product.name}
      </h3>
      <div className="flex items-center mb-2">
        <div className="flex text-amber-400 mr-1">
          <RatingStars rating={product.rating} />
        </div>
        <span className="text-xs text-gray-500">({product.rating})</span>
      </div>
      <div className="flex items-center">
        <ProductPrice product={product} />
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="mt-3 w-full bg-[#770504] hover:bg-[#5a0403] text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard
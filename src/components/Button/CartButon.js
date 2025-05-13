
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartButton = ({ 
  product, 
  onAddToCart, 
  className = "", 
  iconClassName = "mr-1 text-xs",
  buttonText = "Add to Cart"
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full bg-[#770504] hover:bg-[#5a0403] text-white py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-center ${className}`}
    >
      <FontAwesomeIcon icon={faShoppingCart} className={iconClassName} />
      {buttonText}
    </button>
  );
};

export default CartButton;
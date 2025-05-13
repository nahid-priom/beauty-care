import { faShoppingCart, faBars, faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ProfileIcon from "./Profile";

const NavIcons = ({
  totalQuantity,
  isMenuOpen,
  setIsMenuOpen,
  setShowCartPreview,
  showCartPreview,
  cartItems,
  totalAmount,
}) => {
  return (
    <div className="flex items-center space-x-3 lg:space-x-5">
      
      {/* Wishlist Icon */}
      <button className="hidden md:block text-gray-700 hover:text-[#770504]">
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
      </button>

      {/* Cart Icon & Preview */}
      <div
        className="relative"
        onMouseEnter={() => setShowCartPreview(true)}
        onMouseLeave={() => setShowCartPreview(false)}
      >
        <Link to="/cart" className="text-gray-700 hover:text-[#770504] relative">
          <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#770504] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>

        {/* Cart Preview Dropdown */}
        {showCartPreview && cartItems.length > 0 && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded shadow-lg border border-gray-200 z-50">
            <div className="p-4 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-2 border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm line-clamp-1">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between font-bold mb-2">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                className="block w-full text-center bg-[#770504] hover:bg-[#5a0403] text-white py-2 rounded text-sm"
                onClick={() => setShowCartPreview(false)}
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Icon */}
      <ProfileIcon />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
        <span className="ml-2 font-medium">MENU</span>
      </button>
    </div>
  );
};

export default NavIcons;

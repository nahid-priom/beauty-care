import { faTimes, faSearch, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PRODUCT_CATEGORIES from "../../data/products-category";

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  active,
  handleCategoryClick,
  searchQuery, 
  setSearchQuery,
  totalQuantity,
  handleSearch,
  searchSuggestions,
  setSearchSuggestions
}) => (
  <div
    className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex justify-between items-center p-4 border-b">
      <div className="text-lg font-bold text-[#770504]">Menu</div>
      <button onClick={onClose} className="text-[#770504]" aria-label="Close menu">
        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
      </button>
    </div>

    <div className="p-4 border-b relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {/* Mobile Search Suggestions */}
      {searchSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
          {searchSuggestions.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex items-center p-2 hover:bg-gray-100"
              onClick={() => {
                setSearchQuery("");
                setSearchSuggestions([]);
                onClose();
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover mr-3"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800">{product.name}</div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">{product.category}</div>
                  <div className="text-sm font-bold text-[#770504]">
                    ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>

    <ul className="px-4 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
      {PRODUCT_CATEGORIES.map((category) => (
        <li key={category.id}>
          <button
            onClick={() => handleCategoryClick(category.id)}
            className={`w-full text-left flex items-center justify-between py-3 px-3 rounded transition-colors duration-300 ${
              active === category.title 
                ? "text-[#770504] bg-[#770504]/10" 
                : "text-gray-700 hover:bg-[#770504]/10"
            }`}
          >
            <span className="font-medium">{category.title}</span>
          </button>
        </li>
      ))}

      <li>
        <Link
          to="/wishlist"
          className="flex items-center py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-3 text-gray-700" />
          <span className="font-medium">Wishlist</span>
        </Link>
      </li>
      <li>
        <Link
          to="/cart"
          className="flex items-center py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300 relative"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-3 text-gray-700" />
          <span className="font-medium">Cart</span>
          {totalQuantity > 0 && (
            <span className="absolute right-3 bg-[#770504] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
      </li>
    </ul>
  </div>
);

export default MobileMenu;
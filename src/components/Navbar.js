import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faShoppingCart,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

// Constants
const PRODUCT_CATEGORIES = [
  { id: "skin-care", title: "Skin Care" },
  { id: "hair-care", title: "Hair Care" },
  { id: "men", title: "Men" },
  { id: "makeup", title: "MakeUp" },
  { id: "baby-care", title: "Baby Care" },
  { id: "women", title: "Women" },
  { id: "brand", title: "Brand" },
];

const OFFERS = [
  "🔥 50% OFF ON ALL HAIR CARE PRODUCTS 🔥",
  "🎉 FREE SHIPPING ON ORDERS OVER $50 🎉",
  "💝 BUY 1 GET 1 FREE ON SELECT ITEMS 💝",
];

// Sample product data for search suggestions
const PRODUCTS = [
  
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Skin Care",
      price: 29.99,
      discountPrice: 24.99,
      rating: 4.5,
      image:
        "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Hair Growth Serum",
      category: "Hair Care",
      price: 34.99,
      discountPrice: 27.99,
      rating: 4.2,
      image:
        "https://vader-prod.s3.amazonaws.com/1656077250-13442792-1424913539756896.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Men's Grooming Kit",
      category: "Men",
      price: 49.99,
      discountPrice: 39.99,
      rating: 4.7,
      image:
        "https://ke3nbeauty.com/wp-content/uploads/2023/06/001-Brown-lotion-2-scaled-1.jpg",
      inStock: true,
    },
    {
      id: 4,
      name: "Luxury Makeup Set",
      category: "MakeUp",
      price: 59.99,
      discountPrice: 49.99,
      rating: 4.8,
      image:
        "https://www.byrdie.com/thmb/s0Mqz8eR0FVwB_l-Ugn4joDjb2k=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-ordinary-squalane-ebac0a25274c4c2280bd8e7174b46b6f.jpg",
      inStock: true,
    },
    {
      id: 5,
      name: "Baby Care Kit",
      category: "Baby Care",
      price: 39.99,
      discountPrice: 34.99,
      rating: 4.9,
      image:
        "https://atlas-content-cdn.pixelsquid.com/stock-images/baby-care-set-body-wash-nr11RxE-600.jpg",
      inStock: true,
    },
    {
      id: 6,
      name: "Women's Perfume",
      category: "Women",
      price: 45.99,
      discountPrice: 39.99,
      rating: 4.6,
      image:
        "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek=",
      inStock: true,
    },
  
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const { items: cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  // Handle scroll effect
  const handleScroll = useCallback(() => {
    setHasShadow(window.scrollY > 10);
  }, []);

  // Set active category based on route
  const updateActiveCategory = useCallback(() => {
    const currentPath = location.pathname.split("/")[1];
    const currentNav = PRODUCT_CATEGORIES.find((nav) => nav.id === currentPath);
    setActive(currentNav ? currentNav.title : "Home");
  }, [location]);

  useEffect(() => {
  if (searchQuery.length >= 3) {
    const results = PRODUCTS
      .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);
    setSearchSuggestions(results);
  } else {
    setSearchSuggestions([]);
  }
}, [searchQuery]);

  // Event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Update active category when location changes
  useEffect(() => {
    updateActiveCategory();
  }, [location, updateActiveCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSearchSuggestions([]);
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
    setActive(PRODUCT_CATEGORIES.find(c => c.id === categoryId)?.title || "Home");
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Header Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top Offers Bar */}
        <TopOffersBar />

        {/* Main Navigation */}
        <nav className={`transition-all duration-300 ${hasShadow ? "shadow-md" : ""} bg-white`}>
          <div className="container py-1 mx-auto px-4">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <Logo />
              
              <DesktopSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                searchSuggestions={searchSuggestions}
                setSearchSuggestions={setSearchSuggestions}
                
              />
              
              <NavIcons 
                totalQuantity={totalQuantity}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                setShowCartPreview={setShowCartPreview}
                showCartPreview={showCartPreview}
                cartItems={cartItems}
                totalAmount={totalAmount}
              />
            </div>

            {/* Desktop Categories */}
            <DesktopCategories 
              active={active} 
              handleCategoryClick={handleCategoryClick}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu 
            isOpen={isMenuOpen} 
            onClose={() => setIsMenuOpen(false)}
            active={active}
            handleCategoryClick={handleCategoryClick}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            totalQuantity={totalQuantity}
            handleSearch={handleSearch}
            searchSuggestions={searchSuggestions}
            setSearchSuggestions={setSearchSuggestions}
          />
        </nav>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="pt-[80px] md:pt-[140px]" />
    </>
  );
};

// Sub-components

const TopOffersBar = () => (
  <div className="bg-[#770504] text-white py-1 px-4">
    <div className="container mx-auto overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {[...OFFERS, ...OFFERS].map((offer, index) => (
          <span key={`offer-${index}`} className="inline-block mx-8 text-sm">
            {offer}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Logo = () => (
  <div className="flex items-center">
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="w-[120px] h-[60px] lg:w-[180px] lg:h-[80px] object-contain"
      />
    </Link>
  </div>
);

const DesktopSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch,
  searchSuggestions,
  setSearchSuggestions
}) => (
  <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#770504]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
        type="submit"
        className="absolute right-0 top-0 h-full px-4 bg-[#770504] text-white rounded-r hover:bg-[#5a0403]"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>

    {/* Search Suggestions */}
    {searchSuggestions.length > 0 && (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
        {searchSuggestions.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center p-2 hover:bg-gray-100"
            onClick={() => {
              setSearchQuery("");
              setSearchSuggestions([]);
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 object-cover mr-3"
            />
            <div className="flex flex-col w-full">
              <div className="font-medium text-gray-800">{product.name}</div>
              <div className="flex justify-start gap-4">
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
);

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
    <div className="flex items-center space-x-4 lg:space-x-6">
      <button className="hidden md:block text-gray-700 hover:text-[#770504]">
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
      </button>
      
      {/* Cart with Preview */}
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

        {/* Cart Preview */}
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

      {/* Mobile menu button */}
      <button
        className="md:hidden flex items-center text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          className="text-xl"
        />
        <span className="ml-2 font-medium">MENU</span>
      </button>
    </div>
  );
};

const DesktopCategories = ({ active, handleCategoryClick }) => (
  <div className="hidden md:flex justify-center border-t border-gray-200 py-2">
    <ul className="flex space-x-6">
      {PRODUCT_CATEGORIES.map((category) => (
        <li key={category.id} className="relative">
          <button
            onClick={() => handleCategoryClick(category.id)}
            className={`px-2 py-1 font-medium transition-colors duration-300 ${
              active === category.title ? "text-[#770504]" : "text-gray-700 hover:text-[#770504]"
            }`}
          >
            {category.title}
            {active === category.title && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-[#770504]" />
            )}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

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

export default Navbar;
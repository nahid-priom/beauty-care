import { useState, useEffect, useCallback} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProducts } from "../../providers/ProductProvider";
import PRODUCT_CATEGORIES from "../../data/products-category";
import { useSearch } from "../../hooks/useSearch";

import DesktopSearch from "./DesktopSearch";
import TopOffersBar from "./TopOffersBar";
import Logo from "./NavLogo";
import NavIcons from "./NavIcons";
import DesktopCategories from "./DesktopCategories";
import MobileMenu from "./MobileMenu";
import ProductsLoading from "../../components/Preloader";


const Navbar = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Search functionality
  const { searchQuery, setSearchQuery, searchSuggestions } = useSearch(
    products || []
  );

  // Cart data
  const {
    items: cartItems,
    totalQuantity,
    totalAmount,
  } = useSelector((state) => state.cart);



  // Handlers
  const handleScroll = useCallback(() => {
    setHasShadow(window.scrollY > 10);
  }, []);

  const updateActiveCategory = useCallback(() => {
    const currentPath = location.pathname.split("/")[1];
    const currentNav = PRODUCT_CATEGORIES.find((nav) => nav.id === currentPath);
    setActive(currentNav ? currentNav.title : "Home");
  }, [location.pathname]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setIsMenuOpen(false);
        setIsSearchFocused(false);
      }
    },
    [searchQuery, navigate, setSearchQuery]
  );

  const handleCategoryClick = useCallback(
    (categoryId) => {
      navigate(`/products?category=${categoryId}`);
      setActive(
        PRODUCT_CATEGORIES.find((c) => c.id === categoryId)?.title || "Home"
      );
      setIsMenuOpen(false);
    },
    [navigate]
  );

  const handleSuggestionClick = useCallback(
    (productId) => {
      navigate(`/product/${productId}`);
      setSearchQuery("");
      setIsSearchFocused(false);
      setIsMenuOpen(false);
    },
    [navigate, setSearchQuery]
  );

  // Effects
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    updateActiveCategory();
  }, [location.pathname, updateActiveCategory]);

  if (loading) return <ProductsLoading />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopOffersBar />
        <nav
          className={`transition-all duration-300 ${
            hasShadow ? "shadow-md" : ""
          } bg-white`}
        >
          <div className="container py-1 mx-auto px-4">
            <div className="flex items-center justify-between">
              <Logo />

              {/* Desktop Search with Suggestions */}
              <div className="relative hidden md:block flex-1 max-w-xl mx-4">
                <DesktopSearch
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                />

                {isSearchFocused &&
                  searchQuery.length >= 3 &&
                  searchSuggestions?.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSuggestionClick(product.id)}
                          className="flex items-center p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          {/* Improved image handling with fallback */}
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/path-to-fallback-image.png";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Product info with improved styling */}
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm font-semibold text-red-800">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.discountPrice && (
                                <span className="ml-2 text-xs text-gray-500 line-through">
                                  ${product.discountPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div
                              className={`text-xs mt-1 ${
                                product.inStock
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

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

            <DesktopCategories
              active={active}
              handleCategoryClick={handleCategoryClick}
            />
          </div>

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
            showSuggestions={isSearchFocused}
            onSuggestionClick={handleSuggestionClick}
          />
        </nav>
      </div>
      <div className="pt-[40px] md:pt-[80px]" />
    </>
  );
};

export default Navbar;

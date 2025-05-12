import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PRODUCT_CATEGORIES from "../../data/products-category";
import PRODUCTS from "../../data/products";
import DesktopSearch from "./DesktopSearch";
import TopOffersBar from "./TopOffersBar";
import Logo from "./NavLogo";
import NavIcons from "./NavIcons";
import DesktopCategories from "./DesktopCategories";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const {
    items: cartItems,
    totalQuantity,
    totalAmount,
  } = useSelector((state) => state.cart);

  const handleScroll = useCallback(() => {
    setHasShadow(window.scrollY > 10);
  }, []);

  const updateActiveCategory = useCallback(() => {
    const currentPath = location.pathname.split("/")[1];
    const currentNav = PRODUCT_CATEGORIES.find((nav) => nav.id === currentPath);
    setActive(currentNav ? currentNav.title : "Home");
  }, [location]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const results = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(results);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    setActive(
      PRODUCT_CATEGORIES.find((c) => c.id === categoryId)?.title || "Home"
    );
    setIsMenuOpen(false);
  };

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
            setSearchSuggestions={setSearchSuggestions}
          />
        </nav>
      </div>

      <div className="pt-[80px] md:pt-[140px]" />
    </>
  );
};

export default Navbar;

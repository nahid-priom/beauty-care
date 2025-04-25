import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faEnvelope,
  faPhone,
  faUser,
  faShoppingCart,
  faSearch,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import slick from "slick-carousel/slick/slick.css";
import slickTheme from "slick-carousel/slick/slick-theme.css";

import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [navbarShadow, setNavbarShadow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Product categories for the new navigation
  const productCategories = [
    { id: "skin-care", title: "Skin Care" },
    { id: "hair-care", title: "Hair Care" },
    { id: "men", title: "Men" },
    { id: "makeup", title: "MakeUp" },
    { id: "baby-care", title: "Baby Care" },
    { id: "women", title: "Women" },
    { id: "brand", title: "Brand" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavbarShadow(true);
      } else {
        setNavbarShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    const currentNav = productCategories.find((nav) => nav.id === currentPath);
    if (currentNav) {
      setActive(currentNav.title);
    } else {
      setActive("Home");
    }
  }, [location]);

  return (
    <>
      {/* Sticky Header Wrapper (Top Header + Navbar) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top Header */}
        <div className="bg-[#770504] text-white py-1 px-4">
          <div className="container mx-auto overflow-hidden">
            {/* Scrolling offers ticker - desktop version */}
            <div className="hidden md:block w-full overflow-hidden">
              <div className="relative">
                {/* Double the content for seamless looping */}
                <div className="animate-marquee text-xs whitespace-nowrap">
                  <span className="mx-8">
                    🔥 50% OFF ON ALL HAIR CARE PRODUCTS 🔥
                  </span>
                  <span className="mx-8">
                    🎉 FREE SHIPPING ON ORDERS OVER $50 🎉
                  </span>
                  <span className="mx-8">
                    💝 BUY 1 GET 1 FREE ON SELECT ITEMS 💝
                  </span>
                  <span className="mx-8">
                    🌟 NEW CUSTOMERS GET 15% OFF FIRST ORDER 🌟
                  </span>
                  <span className="mx-8">
                    🛍️ EXTRA 10% OFF ON FIRST SUBSCRIPTION 🛍️
                  </span>
                  <span className="mx-8">
                    💳 USE CODE WELCOME20 FOR 20% OFF 💳
                  </span>
                  <span className="mx-8">
                    🚚 SAME DAY DELIVERY IN SELECT CITIES 🚚
                  </span>
                  {/* Repeated for seamless looping */}
                  <span className="mx-8">
                    🔥 50% OFF ON ALL HAIR CARE PRODUCTS 🔥
                  </span>
                  <span className="mx-8">
                    🎉 FREE SHIPPING ON ORDERS OVER $50 🎉
                  </span>
                  <span className="mx-8">
                    💝 BUY 1 GET 1 FREE ON SELECT ITEMS 💝
                  </span>
                  <span className="mx-8">
                    🌟 NEW CUSTOMERS GET 15% OFF FIRST ORDER 🌟
                  </span>
                  <span className="mx-8">
                    🛍️ EXTRA 10% OFF ON FIRST SUBSCRIPTION 🛍️
                  </span>
                  <span className="mx-8">
                    💳 USE CODE WELCOME20 FOR 20% OFF 💳
                  </span>
                  <span className="mx-8">
                    🚚 SAME DAY DELIVERY IN SELECT CITIES 🚚
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile offers - static rotating version */}
            <div className="md:hidden py-1 text-center">
              <div className="animate-fade text-xs">
                <div>🔥 50% OFF HAIR CARE | FREE SHIPPING $50+ 🔥</div>
                <div className="hidden">
                  🎉 BUY 1 GET 1 FREE | USE CODE BOGO 🎉
                </div>
                <div className="hidden">
                  🌟 NEW CUSTOMERS: 20% OFF FIRST ORDER 🌟
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`transition-all duration-300 ${
            navbarShadow ? "shadow-md bg-white" : "bg-white"
          }`}
        >
          <div className="container py-1 mx-auto px-4">
            {/* Top Row - Logo, Search, Icons */}
            <div className="flex items-center justify-between">
              {/* Logo on the left */}
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-[120px] h-[60px] lg:w-[180px] lg:h-[80px] object-contain"
                  />
                </Link>
              </div>

              {/* Search bar in the middle - hidden on mobile */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#770504]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-[#770504] text-white rounded-r hover:bg-[#5a0403]">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>

              {/* Icons on the right */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                <button className="hidden md:block text-gray-700 hover:text-[#770504]">
                  <FontAwesomeIcon icon={faHeart} className="text-xl" />
                </button>
                <button className="text-gray-700 hover:text-[#770504] relative">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                  <span className="absolute -top-2 -right-2 bg-[#770504] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
                <button className="text-gray-700 hover:text-[#770504]">
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                </button>

                {/* Mobile menu button - visible only on mobile */}
                <button
                  className="md:hidden flex items-center text-gray-700"
                  onClick={() => setToggle(!toggle)}
                >
                  <FontAwesomeIcon
                    icon={toggle ? faTimes : faBars}
                    className="text-xl"
                  />
                  <span className="ml-2 font-medium">MENU</span>
                </button>
              </div>
            </div>

            {/* Bottom Row - Product Categories */}
            <div className="hidden md:flex justify-center border-t border-gray-200 py-2">
              <ul className="flex space-x-6">
                {productCategories.map((category) => (
                  <li
                    key={category.id}
                    className={`relative ${
                      active === category.title
                        ? "text-[#770504]"
                        : "text-gray-700"
                    }`}
                  >
                    <Link
                      to={`/${category.id}`}
                      className="px-2 py-1 font-medium hover:text-[#770504] transition-colors duration-300"
                      onClick={() => setActive(category.title)}
                    >
                      {category.title}
                    </Link>
                    {active === category.title && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-[#770504]"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <div
            className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
              toggle ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-lg font-bold text-[#770504]">Menu</div>
              <button
                onClick={() => setToggle(false)}
                className="text-[#770504]"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search - visible in mobile menu */}
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>

            <ul className="px-4 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-150px)]">
              {productCategories.map((category) => (
                <li
                  key={category.id}
                  className={`${
                    active === category.title
                      ? "text-[#770504]"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setActive(category.title);
                    setToggle(false);
                  }}
                >
                  <Link
                    to={`/${category.id}`}
                    className="flex items-center justify-between py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300"
                  >
                    <span className="font-medium">{category.title}</span>
                  </Link>
                </li>
              ))}

              {/* Additional mobile menu items */}
              <li className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  to="/account"
                  className="flex items-center py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-3 text-gray-700"
                  />
                  <span className="font-medium">My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="flex items-center py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mr-3 text-gray-700"
                  />
                  <span className="font-medium">Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="flex items-center py-3 px-3 rounded hover:bg-[#770504]/10 transition-colors duration-300"
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="mr-3 text-gray-700"
                  />
                  <span className="font-medium">Cart</span>
                  <span className="ml-auto bg-[#770504] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Add padding to prevent content from being hidden under the sticky header */}
      <div className="pt-[80px] md:pt-[140px]"></div>
    </>
  );
};

export default Navbar;

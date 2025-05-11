import  { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faTimes,
  faStar,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

// Constants moved outside component to prevent recreation on every render
const PRODUCT_CATEGORIES = [
  { id: "skin-care", title: "Skin Care" },
  { id: "hair-care", title: "Hair Care" },
  { id: "men", title: "Men" },
  { id: "makeup", title: "MakeUp" },
  { id: "baby-care", title: "Baby Care" },
  { id: "women", title: "Women" },
  { id: "brand", title: "Brand" },
];

const PRICE_RANGES = [
  { label: "Under $25", value: "0-25" },
  { label: "$25 to $50", value: "25-50" },
  { label: "$50 to $100", value: "50-100" },
  { label: "Over $100", value: "100-1000" },
];

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Premium Face Cream",
    category: "Skin Care",
    slug: "skin-care",
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
    slug: "hair-care",
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
    slug: "men",
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
    slug: "makeup",
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
    slug: "baby-care",
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
    slug: "women",
    price: 45.99,
    discountPrice: 39.99,
    rating: 4.6,
    image:
      "https://media.istockphoto.com/id/178132583/photo/perfume-bottle.jpg?s=612x612&w=0&k=20&c=UyEDo1NFgdDnxZuPgxYVpOq3hX7RAlZhwxw1muHAoek=",
    inStock: true,
  },
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get query parameters from URL
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const urlCategoryId = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  // Find the matching category object
  const activeCategory = useMemo(
    () => PRODUCT_CATEGORIES.find((cat) => cat.id === urlCategoryId),
    [urlCategoryId]
  );

  // Initialize filters with URL parameters
  const [filters, setFilters] = useState({
    category: activeCategory ? [activeCategory.title] : [],
    priceRange: "",
    rating: null,
    inStock: false,
  });

  // Update filters when URL changes
  useEffect(() => {
    const newActiveCategory = PRODUCT_CATEGORIES.find(
      (cat) => cat.id === urlCategoryId
    );
    setFilters((prev) => ({
      ...prev,
      category: newActiveCategory ? [newActiveCategory.title] : prev.category,
    }));
  }, [urlCategoryId]);

  // Memoized filtered products
  const filteredProducts = useMemo(
    () =>
      ALL_PRODUCTS.filter((product) => {
        // Category filter
        if (
          filters.category.length > 0 &&
          !filters.category.includes(product.category)
        ) {
          return false;
        }

        // Search filter (from URL)
        if (
          urlSearch &&
          !product.name.toLowerCase().includes(urlSearch.toLowerCase())
        ) {
          return false;
        }

        // Price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split("-").map(Number);
          const price = product.discountPrice || product.price;
          if (price < min || price > max) return false;
        }

        // Rating filter
        if (filters.rating !== null && product.rating < filters.rating) {
          return false;
        }

        // Stock filter
        if (filters.inStock && !product.inStock) {
          return false;
        }

        return true;
      }),
    [filters, urlSearch]
  );

  // Memoized categories
  const categories = useMemo(
    () => [...new Set(ALL_PRODUCTS.map((product) => product.category))],
    []
  );

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "category") {
        const updatedCategories = prev.category.includes(value)
          ? prev.category.filter((cat) => cat !== value)
          : [...prev.category, value];

        // Update URL when category changes
        if (updatedCategories.length === 1) {
          const category = PRODUCT_CATEGORIES.find(
            (cat) => cat.title === updatedCategories[0]
          );
          navigate(`/products?category=${category?.id || ""}`, {
            replace: true,
          });
        } else {
          navigate("/products", { replace: true });
        }

        return { ...prev, category: updatedCategories };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: "",
      rating: null,
      inStock: false,
    });
    navigate("/products", { replace: true });
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: 1,
      })
    );

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={i < Math.floor(rating) ? faStar : faStarRegular}
        className="text-xs"
      />
    ));
  };

  const renderProductPrice = (product) => {
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen overflow-hidden bg-gray-50">
        {/* Mobile filter toggle */}
        <div className="lg:hidden bg-white shadow-sm pt-8 py-3 px-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center text-gray-700"
          >
            <FontAwesomeIcon icon={faSlidersH} className="mr-2" />
            Filters
          </button>
        </div>

        <div className="container mx-auto px-4 py-4 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div
              className={`fixed lg:static inset-1 z-40 bg-white transform transition-transform duration-300 ease-in-out 
                ${
                  showMobileFilters ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0
              w-72 lg:w-64 h-full lg:h-auto overflow-y-auto lg:overflow-visible shadow-lg lg:shadow-none`}
            >
              <div className="p-6 lg:p-0">
                <div className="flex justify-between items-center mb-6 lg:mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                {/* Categories filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => toggleFilter("category", category)}
                          className="rounded text-[#770504] focus:ring-[#770504] mr-2"
                        />
                        <span className="text-gray-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() =>
                            toggleFilter("priceRange", range.value)
                          }
                          className="rounded-full text-[#770504] focus:ring-[#770504] mr-2"
                        />
                        <span className="text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
                  <div className="flex flex-col space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          toggleFilter(
                            "rating",
                            filters.rating === rating ? null : rating
                          )
                        }
                        className={`flex items-center text-left ${
                          filters.rating === rating
                            ? "text-amber-400"
                            : "text-gray-400"
                        }`}
                      >
                        <div className="flex mr-2">
                          {renderRatingStars(rating)}
                        </div>
                        <span className="text-xs text-gray-500">& up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* In stock filter */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={() => toggleFilter("inStock", !filters.inStock)}
                      className="rounded text-[#770504] focus:ring-[#770504] mr-2"
                    />
                    <span className="text-gray-600">In Stock Only</span>
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="text-sm text-[#770504] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>

            {/* Products section */}
            <div className="flex-1">
              {/* Sort and results count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-gray-600 mb-2 sm:mb-0">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-gray-600 mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-[#770504] focus:border-[#770504]"
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Rating</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={product.image}
                        onClick={() => navigate(`/product/${product.id}`)}
                        alt={product.name}
                        className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="text-gray-400 hover:text-red-500"
                        />
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
                          {renderRatingStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.rating})
                        </span>
                      </div>
                      <div className="flex items-center">
                        {renderProductPrice(product)}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-3 w-full bg-[#770504] hover:bg-[#5a0403] text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="mr-2"
                        />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No products match your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#770504] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded bg-[#770504] text-white">
                      1
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                      2
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                      3
                    </button>
                    <span className="px-2 text-gray-600">...</span>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                      8
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;

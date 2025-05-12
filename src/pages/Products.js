import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import PRODUCT_CATEGORIES from "../data/products-category";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/Filter/CategoryFilter";
import PriceFilter from "../components/Filter/PriceFilter";
import RatingFilter from "../components/Filter/RatingFilter";
import StockFilter from "../components/Filter/StockFilter";
import { fetchProducts } from '../services/ProductsApi';
import ProductsLoading from "../components/Preloader"; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.title,
          category: product.category,
          slug: product.category.replace(/\s+/g, '-').toLowerCase(),
          price: product.price,
          discountPrice: product.price * 0.9,
          rating: product.rating,
          image: product.thumbnail,
          inStock: product.stock > 0,
        }));
        setProducts(transformedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlCategoryId = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  const activeCategory = useMemo(
    () => PRODUCT_CATEGORIES.find((cat) => cat.id === urlCategoryId),
    [urlCategoryId]
  );

  const [filters, setFilters] = useState({
    category: activeCategory ? [activeCategory.title] : [],
    priceRange: "",
    rating: null,
    inStock: false,
  });

  useEffect(() => {
    const newActiveCategory = PRODUCT_CATEGORIES.find((cat) => cat.id === urlCategoryId);
    setFilters((prev) => {
      if (newActiveCategory?.title !== prev.category[0]) {
        return {
          ...prev,
          category: newActiveCategory ? [newActiveCategory.title] : prev.category,
        };
      }
      return prev;
    });
  }, [urlCategoryId]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (filters.category.length > 0 && 
          !filters.category.some(cat => 
            cat.toLowerCase() === product.category.toLowerCase()
          )) {
        return false;
      }
      if (urlSearch && !product.name.toLowerCase().includes(urlSearch.toLowerCase())) {
        return false;
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        const price = product.discountPrice ?? product.price ?? 0;
        if (price < min || price > max) return false;
      }
      if (filters.rating !== null && product.rating < filters.rating) {
        return false;
      }
      if (filters.inStock && !product.inStock) {
        return false;
      }
      return true;
    });

    // Sorting logic
    switch(sortOption) {
      case "price-low-high":
        result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
        break;
      case "price-high-low":
        result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs - adjust as needed
        result.sort((a, b) => b.id - a.id);
        break;
      default: // "featured" or any other option
        // Keep original order
        break;
    }

    return result;
  }, [filters, urlSearch, products, sortOption]);

  const categories = useMemo(() => 
    [...new Set(products.map((product) => product.category))], 
    [products]
  );

  const toggleFilter = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "category") {
        const updatedCategories = prev.category.includes(value)
          ? prev.category.filter((cat) => cat !== value)
          : [...prev.category, value];

        if (updatedCategories.length === 1) {
          const category = PRODUCT_CATEGORIES.find((cat) => cat.title === updatedCategories[0]);
          navigate(`/products?category=${category?.id || ""}`, { replace: true });
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

  if (loading) {
    return <ProductsLoading />; // Use your preloader component
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading products: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-[#770504] text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen overflow-hidden pt-12 lg:pt-20 bg-gray-50">
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
              className={`fixed pt-[85px] lg:pt-0 lg:static inset-1 z-40 bg-white transform transition-transform duration-300 ease-in-out 
                ${
                  showMobileFilters ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0
              w-72 lg:w-64 h-full lg:h-auto overflow-y-auto lg:overflow-visible shadow-lg lg:shadow-none`}
            >
              <div className="p-6 lg:p-0">
                <div className="flex justify-between items-center mb-6 lg:mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                <CategoryFilter categories={categories} filters={filters} toggleFilter={toggleFilter} />
                <PriceFilter filters={filters} toggleFilter={toggleFilter} />
                <RatingFilter filters={filters} toggleFilter={toggleFilter} />
                <StockFilter filters={filters} toggleFilter={toggleFilter} />

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
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-[#770504] focus:border-[#770504]"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    navigate={navigate} 
                    handleAddToCart={handleAddToCart} 
                  />
                ))}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No products match your filters</p>
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
    </>
  );
};

export default ProductsPage;
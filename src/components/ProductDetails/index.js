import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faShoppingCart,
  faHeart,
  faShare,
  faTruck,
  faShieldAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import Footer from "../Footer";
import Navbar from "../Navbar";
import  ALL_PRODUCTS  from "../../data/products";

const ProductDetails = () => {
   const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      // Check if ALL_PRODUCTS exists and is an array
      if (!ALL_PRODUCTS || !Array.isArray(ALL_PRODUCTS)) {
        throw new Error("Products data is not available");
      }

      const foundProduct = ALL_PRODUCTS.find(item => item.id.toString() === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
        setIsFavorite(foundProduct.isFavorite || false);
      } else {
        navigate("/not-found", { replace: true });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Product</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#770504] text-white rounded hover:bg-[#5a0403]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#770504]"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();

    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: quantity,
      })
    );

    toast.success(
      `${quantity > 1 ? `${quantity} × ` : ""}${product.name} added to cart!`,
      {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast[isFavorite ? "info" : "success"](
      `${product.name} ${isFavorite ? "removed from" : "added to"} favorites!`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue)) {
      setQuantity(Math.max(1, Math.min(9, newValue)));
    }
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  const renderTabContent = () => {
    if (!product) return null;
    
    switch (activeTab) {
      case "ingredients":
        return (
          <div>
            <h3 className="font-bold mb-2">Key Ingredients:</h3>
            <p className="text-gray-700">{product.ingredients || "No ingredients information available."}</p>
          </div>
        );
      case "howtouse":
        return (
          <div>
            <h3 className="font-bold mb-2">Directions:</h3>
            <p className="text-gray-700">{product.howToUse || "No usage instructions available."}</p>
          </div>
        );
      default:
        return <p className="text-gray-700">{product.description}</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#770504]"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#770504] mb-6 hover:text-[#5a0403] transition-colors"
            aria-label="Go back to previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Back to Shop
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div>
                <div className="mb-4 h-96 bg-white flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto py-2">
                  {[product.image, ...(product.images || [])].map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 flex-shrink-0 border-2 rounded-md overflow-hidden transition-colors ${
                        selectedImage === img
                          ? "border-[#770504]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      aria-label={`View product image ${index + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-500">
                      {product.brand}
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">
                      {product.name}
                    </h1>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={toggleFavorite}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite
                          ? "text-red-500"
                          : "text-gray-400 hover:text-gray-600"
                      } hover:bg-gray-100`}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button
                      className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Share product"
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          i < Math.floor(product.rating || 0)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-[#770504]">
                      ${product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && product.discountPrice < product.price && (
                      <>
                        <span className="text-lg text-gray-400 line-through ml-2">
                          ${product.price}
                        </span>
                        <span className="ml-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded">
                          SAVE{" "}
                          {Math.round(
                            (1 - product.discountPrice / product.price) * 100
                          )}
                          %
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    SKU: {product.sku || "N/A"}
                  </span>
                  <div
                    className={`text-sm font-medium mt-2 ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-700">{product.shortDescription || product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max="9"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="w-12 h-8 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`w-full py-3 px-4 rounded-md font-bold transition-colors flex items-center justify-center ${
                      product.inStock
                        ? "bg-[#770504] hover:bg-[#5a0403] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-label="Add to cart"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>

                {/* Product Policies */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="text-amber-600 mr-2"
                    />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faExchangeAlt}
                      className="text-amber-600 mr-2"
                    />
                    <span>30-day easy returns</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-amber-600 mr-2"
                    />
                    <span>Authenticity guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="border-t border-gray-200 mt-6">
              <div className="flex border-b border-gray-200">
                {["description", "ingredients", "howtouse"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-[#770504] border-b-2 border-[#770504]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.replace("touse", " to use")}
                  </button>
                ))}
              </div>
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
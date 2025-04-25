import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample product data - replace with your actual data fetching logic
  const product = {
    id: 1,
    name: "Premium Face Cream",
    category: "Skin Care",
    price: 29.99,
    discountPrice: 24.99,
    rating: 4.5,
    reviews: 128,
    description:
      "Our luxurious face cream is formulated with rare marula oil and advanced peptides to deeply hydrate while reducing the appearance of fine lines and wrinkles. Suitable for all skin types.",
    ingredients:
      "Aqua, Marula Oil, Glycerin, Squalane, Peptide Complex, Hyaluronic Acid, Vitamin E",
    howToUse:
      "Apply a small amount to clean face and neck every morning and evening. Gently massage in upward motions.",
    image:
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
    images: [
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
    ],
    isFavorite: false,
    inStock: true,
    sku: "BEAU-2023-SC01",
    brand: "Luxury Beauty",
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [activeTab, setActiveTab] = useState("description");

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // Add your cart logic here
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
    if (value > 0 && value < 10) {
      setQuantity(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#770504] mb-6 hover:text-[#5a0403] transition-colors"
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
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto py-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 flex-shrink-0 border-2 rounded-md overflow-hidden ${
                        selectedImage === img
                          ? "border-[#770504]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
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
                      className={`p-2 rounded-full ${
                        isFavorite ? "text-red-500" : "text-gray-400"
                      } hover:bg-gray-100`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
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
                          i < Math.floor(product.rating)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-[#770504]">
                      ${product.discountPrice}
                    </span>
                    {product.discountPrice < product.price && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${product.price}
                      </span>
                    )}
                    {product.discountPrice < product.price && (
                      <span className="ml-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded">
                        SAVE{" "}
                        {Math.round(
                          (1 - product.discountPrice / product.price) * 100
                        )}
                        %
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    SKU: {product.sku}
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
                  <p className="text-gray-700">{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="9"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value))
                      }
                      className="w-12 h-8 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    className={`w-full py-3 px-4 rounded-md font-bold ${
                      product.inStock
                        ? "bg-[#770504] hover:bg-[#5a0403]"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white transition-colors flex items-center justify-center`}
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
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-6 py-3 font-medium ${
                    activeTab === "description"
                      ? "text-[#770504] border-b-2 border-[#770504]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-6 py-3 font-medium ${
                    activeTab === "ingredients"
                      ? "text-[#770504] border-b-2 border-[#770504]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("howtouse")}
                  className={`px-6 py-3 font-medium ${
                    activeTab === "howtouse"
                      ? "text-[#770504] border-b-2 border-[#770504]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  How to Use
                </button>
              </div>
              <div className="p-6">
                {activeTab === "description" && (
                  <p className="text-gray-700">{product.description}</p>
                )}
                {activeTab === "ingredients" && (
                  <div>
                    <h3 className="font-bold mb-2">Key Ingredients:</h3>
                    <p className="text-gray-700">{product.ingredients}</p>
                  </div>
                )}
                {activeTab === "howtouse" && (
                  <div>
                    <h3 className="font-bold mb-2">Directions:</h3>
                    <p className="text-gray-700">{product.howToUse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

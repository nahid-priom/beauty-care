import React, { useState, useEffect, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronLeft,
  faShoppingCart,
  faHeart,
  faTruck,
  faShieldAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found.");
        const data = await response.json();

        startTransition(() => {
          setProduct(data);
          setSelectedImage(data.thumbnail || data.images?.[0]);
        });
      } catch (err) {
        startTransition(() => {
          
          navigate("/not-found", { replace: true });
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity,
      })
    );

    toast.success(`${product.title} added to cart!`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast[isFavorite ? "info" : "success"](
      `${product.title} ${isFavorite ? "removed from" : "added to"} favorites!`
    );
  };

  const incrementQuantity = () =>
    setQuantity((prev) => (prev < 9 ? prev + 1 : 9));
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#770504] border-b-2"></div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Product not available.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="text-[#770504] mb-4 hover:underline"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Shop
          </button>

          <div className="bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-96 object-contain border rounded"
              />
              <div className="flex mt-4 gap-2 overflow-x-auto">
                {[product.thumbnail, ...(product.images || [])].map(
                  (img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 object-cover border-2 cursor-pointer ${
                        selectedImage === img
                          ? "border-[#770504]"
                          : "border-gray-200"
                      } rounded`}
                      alt={`Thumbnail ${i + 1}`}
                    />
                  )
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

              {/* Rating */}
              <div className="flex items-center mt-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      i < Math.round(product.rating) ? "" : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-4">
                <span className="text-2xl font-bold text-[#770504]">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="ml-3 px-2 py-1 bg-yellow-500 text-white text-xs rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-gray-700">{product.description}</p>

              {/* Quantity & Actions */}
              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <label className="mr-3 font-medium">Quantity:</label>
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 bg-gray-100 border rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(9, +e.target.value)))
                    }
                    className="w-12 text-center border-t border-b"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 bg-gray-100 border rounded-r"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#770504] hover:bg-[#5a0403] text-white py-3 rounded-md font-semibold flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={toggleFavorite}
                  className="mt-3 text-sm text-[#770504] hover:underline"
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-1" />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>

              {/* Policies */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="text-amber-500 mr-2"
                  />
                  {product.shippingInformation || "Ships in 3–5 days"}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faExchangeAlt}
                    className="text-amber-500 mr-2"
                  />
                  {product.returnPolicy || "30-day return policy"}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-amber-500 mr-2"
                  />
                  {product.warrantyInformation || "Warranty available"}
                </div>
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

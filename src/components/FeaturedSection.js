import React, { useState } from "react";
import Slider from "react-slick";
import {
  faHeart,
  faShoppingCart,
  faStar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 text-[#770504] p-2 rounded-full shadow-md hover:bg-white transition-all"
    aria-label="Next"
  >
    <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 text-[#770504] p-2 rounded-full shadow-md hover:bg-white transition-all"
    aria-label="Previous"
  >
    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
  </button>
);

const FeaturedCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Face Cream",
      category: "Skin Care",
      price: 29.99,
      discountPrice: 24.99,
      rating: 4.5,
      image:
        "https://www.byrdie.com/thmb/OehxtSdUYnNauaLpU5GqQ8F7un4=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/drunk-elephant-marula-oil-11845abc4f2541ba9ef64231fb2d9f27.jpg",
      isFavorite: false,
      addedToCart: false,
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
      isFavorite: false,
      addedToCart: false,
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
      isFavorite: false,
      addedToCart: false,
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
      isFavorite: false,
      addedToCart: false,
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
      isFavorite: false,
      addedToCart: false,
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
      isFavorite: false,
      addedToCart: false,
    },
  ]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  const toggleFavorite = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );

    const product = products.find((p) => p.id === productId);
    toast[product.isFavorite ? "info" : "success"](
      `${product.name} ${
        product.isFavorite ? "removed from" : "added to"
      } favorites!`,
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

  const addToCart = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.image,
        quantity: 1,
      })
    );

    // Show "View Cart" button with animation
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, addedToCart: true } : p
      )
    );

    toast.success(`${product.name} added to cart!`, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    
  };

  return (
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#770504] mb-2 text-center">
          Featured Categories
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 text-center">
          Discover our premium collection
        </p>

        <div className="relative">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  {/* Product Image */}
                  <div
                    className="relative pt-[100%] cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    />
                    {/* Favorite Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        product.isFavorite ? "text-red-500" : "text-gray-300"
                      } bg-white/80 hover:bg-white transition-colors`}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                    {/* Category Badge */}
                    <span className="absolute bottom-2 left-2 bg-[#770504] text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3
                      className="font-semibold text-sm md:text-base mb-2 line-clamp-2 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-amber-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`text-xs md:text-sm ${
                              i < Math.floor(product.rating)
                                ? "text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-[#770504] font-bold text-sm md:text-lg">
                          ${product.discountPrice}
                        </span>
                        {product.discountPrice < product.price && (
                          <span className="text-gray-400 text-sm line-through ml-2">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart / View Cart Button */}
                    <div className="mt-2">
                      {product.addedToCart ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                          }}
                          className="w-full bg-yellow-800 hover:bg-yellow-900 text-white px-3 py-2 rounded-full text-xs md:text-sm flex items-center justify-center transition-all animate-underline"
                        >
                          View Cart
                        </button>
                      ) : (
                        <button
                          onClick={(e) => addToCart(product.id, e)}
                          className="w-full bg-[#770504] hover:bg-[#5a0403] text-white px-3 py-2 rounded-full text-xs md:text-sm flex items-center justify-center transition-colors"
                        >
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="mr-1"
                          />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
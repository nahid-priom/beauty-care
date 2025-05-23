import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addItemToCart } from "../../redux/features/cart/cartSlice";
import ProductsLoading from "../Preloader";
import ProductCard from "../ProductCard";
import NextArrow from "../Button/NextArrow";
import PrevArrow from "../Button/PreviousArrow";
import { useProducts } from "../../providers/ProductProvider";

const BeautyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading, error } = useProducts(); // Added default value

  const beautyCategories = [
    "skincare",
    "fragrances",
    "beauty",
    "makeup",
    "hair-care",
    "personal-care",
  ];

  // Added null check for products
  const beautyProducts = products?.length > 0 
    ? products.filter((product) =>
        beautyCategories.some((cat) =>
          product.category?.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : [];

  const settings = {
    dots: false,
    infinite: beautyProducts.length > 1,
    speed: 500,
    slidesToShow: Math.min(5, beautyProducts.length),
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: beautyProducts.length > 5 ? <NextArrow /> : null,
    prevArrow: beautyProducts.length > 5 ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(4, beautyProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, beautyProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, beautyProducts.length),
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const addToCart = (product, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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
    });
  };

  if (loading) return <ProductsLoading />;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#770504] mb-2">
            Beauty Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of beauty essentials
          </p>
        </div>

        {beautyProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-[#770504] mb-2">
              No Beauty Products Available
            </h3>
            <p className="text-gray-600">
              Check back later for our beauty collection
            </p>
          </div>
        ) : (
          <div className="relative">
            <Slider {...settings}>
              {beautyProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  navigate={navigate}
                  handleAddToCart={addToCart}
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeautyProducts;
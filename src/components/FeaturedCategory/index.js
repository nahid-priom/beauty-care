import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsLoading from "../../components/Preloader";
import NextArrow from "../Button/NextArrow";
import PrevArrow from "../Button/PreviousArrow";
import { categoryImages } from "../../data/constant";


const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data.slice(0, 5)); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Carousel settings
  const settings = {
    dots: false,
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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          arrows: true,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  if (loading) return <ProductsLoading />;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#770504] mb-2">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of product categories
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category} className="px-2">
                <div 
                  className="group relative overflow-hidden rounded-xl shadow-md h-64 cursor-pointer"
                  onClick={() => navigate(`/products?category=${category}`)}
                >
                  {/* Category Image */}
                  <img
                    src={categoryImages[category] || categoryImages.default}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold capitalize mb-2">
                      {category.replace(/-/g, ' ')}
                    </h3>
                    <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Shop now</span>
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
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

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../providers/ProductProvider";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import ProductsLoading from "../Preloader";
import ProductCard from "../ProductCard";

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

const FurnitureProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  // Beauty-related categories
  const Categories = [
   "furniture"
  ];

  // Filter only beauty products (case insensitive)
  const FurnitureProducts = products.filter((product) =>
    Categories.some((cat) =>
      product.category?.toLowerCase().includes(cat.toLowerCase())
    )
  );

  // Carousel settings with dynamic slide count
  const settings = {
    dots: true,
    infinite: FurnitureProducts.length > 1,
    speed: 500,
    slidesToShow: Math.min(5, FurnitureProducts.length),
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: FurnitureProducts.length > 5 ? <NextArrow /> : null,
    prevArrow: FurnitureProducts.length > 5 ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(4, FurnitureProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, FurnitureProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, FurnitureProducts.length),
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };



  const addToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

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
  if (error)
    return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (FurnitureProducts.length === 0)
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-[#770504] mb-2">
          No Beauty Products Available
        </h3>
        <p className="text-gray-600">
          Check back later for our beauty collection
        </p>
      </div>
    );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#770504] mb-2">
           Furniture Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of furniture items
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {FurnitureProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
                handleAddToCart={addToCart}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FurnitureProducts;

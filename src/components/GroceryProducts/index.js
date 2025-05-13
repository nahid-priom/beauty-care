
import Slider from "react-slick";
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
import NextArrow from "../Button/NextArrow";
import PrevArrow from "../Button/PreviousArrow";


const GroceryProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const Categories = [
   "groceries"
  ];


  const GroceryProducts = products.filter((product) =>
    Categories.some((cat) =>
      product.category?.toLowerCase().includes(cat.toLowerCase())
    )
  );


  const settings = {
    dots: true,
    infinite: GroceryProducts.length > 1,
    speed: 500,
    slidesToShow: Math.min(5, GroceryProducts.length),
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: GroceryProducts.length > 5 ? <NextArrow /> : null,
    prevArrow: GroceryProducts.length > 5 ? <PrevArrow /> : null,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(4, GroceryProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, GroceryProducts.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, GroceryProducts.length),
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
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
  if (error)
    return <div className="text-red-500 text-center py-12">Error: {error}</div>;
  if (GroceryProducts.length === 0)
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
           Grocery Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of grocery items
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {GroceryProducts.map((product) => (
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

export default GroceryProducts;

import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedCategory";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientTestimonialsCarousel from "../components/ClientTestmonials";
import BeautyProducts from "../components/BeautyProducts";
import GroceryProducts from "../components/GroceryProducts";
import FurnitureProducts from "../components/FurnittureProducts";


const Home = () => {
  return (
    <div className="w-full">
      {/* Page Content */}
      
      <HeroSection />

      <FeaturedSection />

      <BeautyProducts/>
      <GroceryProducts/>
      <FurnitureProducts/>
      <ClientTestimonialsCarousel/>
     
     
    
    </div>
  );
};

export default Home;

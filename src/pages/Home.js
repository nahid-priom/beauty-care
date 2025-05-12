import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import FeaturedSection from "../components/Featured";
import NewArrivals from "../components/NewArrival";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientTestimonialsCarousel from "../components/ClientTestmonials";

const Home = () => {
  return (
    <div className="w-full">
      {/* Page Content */}
      <Navbar />
      <HeroSection />

      <FeaturedSection />

      <NewArrivals />
      <ClientTestimonialsCarousel/>
     
     
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";


import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import FeaturedSection from "../components/FeaturedSection";
import NewArrivals from "../components/NewArrivals";

import Subscription from "../components/Subscription"

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

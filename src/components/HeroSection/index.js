import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';


// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
    aria-label="Next"
  >
    <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
    aria-label="Previous"
  >
    <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
  </button>
);

const HeroSlider = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  // Banner images
  const banners = [banner1, banner2];

  return (
    <section className="container mx-auto pt-2">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-[190px]  sm:h-[400px] lg:h-[500px]">
            <img 
              src={banner} 
              alt={`Banner ${index + 1}`}
              className="w-full pt-2 h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
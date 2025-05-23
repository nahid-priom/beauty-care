import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import NextArrow from "../Button/NextArrow";
import PrevArrow from "../Button/PreviousArrow";
import { useNavigate } from "react-router-dom";
import { startTransition } from "react";

const HeroSlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const banners = [banner1, banner2];

  return (
    <section className="container mx-auto pt-12 lg:pt-20">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className="w-full h-[190px]  sm:h-[400px] lg:h-[500px]"
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full pt-2 h-full cursor-pointer object-cover"
              loading="lazy"
              onClick={() => {
                startTransition(() => {
                  navigate('/products')
                })
              }}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;

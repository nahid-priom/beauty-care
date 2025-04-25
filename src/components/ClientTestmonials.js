import React from 'react';
import Slider from 'react-slick';
import { faQuoteLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Beauty Blogger',
    content: 'The skincare products transformed my routine. My skin has never looked better! The results were visible within just two weeks of regular use.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/43.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Makeup Artist',
    content: 'As a professional, I demand high-quality cosmetics. This brand exceeds my expectations with their pigmentation. Highly recommended!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Salon Owner',
    content: 'My clients absolutely love the hair care line. The products deliver what they promise - shiny, healthy hair with every use. A game-changer!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Grooming Specialist',
    content: 'The men\'s line is exceptional. Finally products that understand male skin needs without overpowering scents. Will definitely repurchase.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white text-[#770504] p-2 rounded-full shadow-lg hover:bg-[#f8f8f8] transition-all"
    aria-label="Next testimonial"
  >
    <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white text-[#770504] p-2 rounded-full shadow-lg hover:bg-[#f8f8f8] transition-all"
    aria-label="Previous testimonial"
  >
    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
  </button>
);

const Testimonials = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#770504] mb-2">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied customers about their experiences with our products</p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2 h-60">
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="flex items-start mb-4">
                    <FontAwesomeIcon 
                      icon={faQuoteLeft} 
                      className="text-[#770504] text-2xl mr-3 mt-1" 
                    />
                    <p className="text-gray-700 italic">{testimonial.content}</p>
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-[#770504]">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-[#770504]' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
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

export default Testimonials;
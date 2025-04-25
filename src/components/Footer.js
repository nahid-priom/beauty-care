import React from 'react';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faPinterest 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="bg-[#770504] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Us */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">About Us</h3>
            <p className="mb-4 text-white/80">
              Your premier destination for high-quality beauty and skincare products. 
              We're committed to bringing you the best in cosmetic innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-white/70 transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-white/70 transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-white/70 transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-white hover:text-white/70 transition">
                <FontAwesomeIcon icon={faPinterest} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Shop</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition">My Account</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Order Tracking</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Wishlist</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Returns & Refunds</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-white/80" />
                <span className="text-white/80">123 Beauty Street, Cosmetic City, CC 12345</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-3 text-white/80" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-white/80" />
                <span className="text-white/80">info@beautyemporium.com</span>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-3 text-white/80" />
                <span className="text-white/80">Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white/10 p-6 rounded-lg mb-8">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">Get updates on special offers and beauty tips</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded text-gray-800 flex-grow min-w-0"
              />
              <button className="bg-white text-[#770504] px-6 py-2 rounded font-medium hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Beauty Emporium. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
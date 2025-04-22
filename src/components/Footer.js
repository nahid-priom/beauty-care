import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#770504] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">About Us</h3>
            <p className="mb-4">
              The Alumni Association connects graduates, supports current students, and strengthens our school community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#FFD700] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FFD700] transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-[#FFD700] transition-colors">Events</Link></li>
              <li><Link to="/news" className="hover:text-[#FFD700] transition-colors">News</Link></li>
              <li><Link to="/gallery" className="hover:text-[#FFD700] transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFD700] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 School Road, Academic City, Country</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@alumniassociation.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-[#FFD700] text-[#770504] px-4 py-2 rounded-r-lg font-medium hover:bg-[#e6c300] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#FFD700]/20 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Alumni Association. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy-policy" className="hover:text-[#FFD700] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FFD700] transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-[#FFD700] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

// CSS Imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

// Assets
import Logo from "./assets/logo.png";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const Contact = lazy(() => import("./pages/Contact"));
const BodyOils = lazy(() => import("./pages/BodyOils"));
const BlogDetails = lazy(() => import("./components/BlogDetails"));
const Subcategory = lazy(() => import("./components/Subcategory"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

const ChildCategory = lazy(() => import("./components/ChildCategory"));
const ClearCache = lazy(() => import("./components/ClearCache"));

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center w-full h-screen bg-white">
    <img 
      src={Logo} 
      alt="Loading..." 
      className="w-40 h-40 mb-6 animate-pulse"
    />
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <span className="text-white font-medium">Loading your beauty experience...</span>
    </div>
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        {/* Global Components */}
        <ScrollToTop />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {/* Routes with Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/bodyoils" element={<BodyOils />} />

            {/* Dynamic Content Pages */}
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/service/:category" element={<Subcategory />} />
            <Route path="/product/:category/:model" element={<ProductDetails />} />

            <Route path="/subcategory/:category/:subcategorySlug" element={<ChildCategory />} />

            {/* Utility Routes */}
            <Route path="/clear-cache" element={<ClearCache />} />

            {/* 404 Fallback */}
            <Route path="*" element={<div className="flex justify-center items-center h-screen">
              <h1 className="text-3xl font-bold text-[#770504]">404 - Page Not Found</h1>
            </div>} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
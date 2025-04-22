import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

import Logo from "./assets/logo.png";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const About = lazy(() => import("./pages/About"));
const Service = lazy(() => import("./pages/Service"));
const Contact = lazy(() => import("./pages/Contact"));
const BodyOils = lazy(() => import("./pages/BodyOils"));
const BlogDetails = lazy(() => import("./components/BlogDetails"));
const Subcategory = lazy(() => import("./components/Subcategory"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Appointment = lazy(() => import("./components/Appoinment"));
const ChildCategory = lazy(() => import("./components/ChildCategory"));
const ClearCache = lazy(() => import("./components/ClearCache"));

const LoadingFallback = ({ children }) => (
  <Suspense
    fallback={
      <div 
        className="flex flex-col justify-center bg-[#770504] items-center w-full h-screen"
        
      >
        <img 
          src={Logo} 
          alt="Logo" 
          className="w-60 h-56 mb-4 animate-pulse"
        />
        <div className="flex items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white border-t-transparent"></div>
          <p className="ml-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    }
  >
    {children}
  </Suspense>
);

const App = () => (
  <HelmetProvider>
    <Router>
      <ScrollToTop />
      <LoadingFallback>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bodyoils" element={<BodyOils />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />

          {/* Dynamic Routes */}
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/service/:category" element={<Subcategory />} />
          <Route path="/product/:category/:model" element={<ProductDetails />} />
          <Route path="/appointment/:model/:service" element={<Appointment />} />
          <Route path="/subcategory/:category/:subcategorySlug" element={<ChildCategory />} />

          <Route path="/clear-cache" element={<ClearCache />} />
        </Routes>
      </LoadingFallback>
    </Router>
  </HelmetProvider>
);

export default App;
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollTop";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkout";
import ProductsPage from "./pages/Products";
import Home from "./pages/Home";
import ProductDetails from "./components/ProductDetails"
import ClearCache from "./components/ClearCache"
import Preloader from "./components/Preloader"





// const Home = lazy(() => import("./pages/Home"));

// const ProductDetails = lazy(() => import("./components/ProductDetails"));

// const ClearCache = lazy(() => import("./components/ClearCache"));
// const Preloader = lazy(() => import("./components/Preloader"));

const LoadingFallback = () => (
  <>
    <Preloader />
  </>
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
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Utility Routes */}
            <Route path="/clear-cache" element={<ClearCache />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center h-screen">
                  <h1 className="text-3xl font-bold text-[#770504]">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;

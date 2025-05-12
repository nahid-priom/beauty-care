import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { ProductsProvider } from "../src/providers/ProductProvider";
import ScrollToTop from "./components/ScrollTop";
import Layout from "./components/Layout";

// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const ClearCache = lazy(() => import("./components/ClearCache"));
const Preloader = lazy(() => import("./components/Preloader"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Preloader />
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ProductsProvider>
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

          {/* Main App Structure */}
          <Suspense fallback={<LoadingFallback />}>
            <Layout>
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
            </Layout>
          </Suspense>
        </ProductsProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
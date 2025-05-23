import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <HelmetProvider>
            <Router>
              <Suspense fallback={<Preloader />}>
                <Layout>
                  {/* Global Components */}
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
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
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
            </Router>
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

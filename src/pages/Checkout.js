import  { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMoneyBillWave,
  faMobileAlt,
  faTruck,
  faMapMarkerAlt,
  faCalendarAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const handlePlaceOrder = () => {
  toast.success('Thank you for your order!', {
    position: 'top-center',
    autoClose: 3000,
  });
};
  const { totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();

  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [address, setAddress] = useState("");
  

  // Delivery options with costs
  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      cost: 5.99,
      days: "3-5 business days",
      icon: faTruck,
    },
    {
      id: "express",
      name: "Express Delivery",
      cost: 12.99,
      days: "1-2 business days",
      icon: faTruck,
    },
    {
      id: "pickup",
      name: "Store Pickup",
      cost: 0,
      days: "Ready in 1 hour",
      icon: faMapMarkerAlt,
    },
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      icon: faCreditCard,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: faMoneyBillWave,
    },
    {
      id: "mobile-payment",
      name: "Mobile Payment",
      icon: faMobileAlt,
    },
  ];

  const selectedDelivery = deliveryOptions.find(
    (opt) => opt.id === deliveryOption
  );
  const deliveryCharge = selectedDelivery ? selectedDelivery.cost : 0;
  const tax = totalAmount * 0.1; // 10% tax
  const grandTotal = totalAmount + deliveryCharge + tax;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Process order logic here
    navigate("/order-confirmation");
  };

  if (totalQuantity === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Please add some products before proceeding to checkout
              </p>
              <Link
                to="/products"
                className="inline-block bg-[#770504] hover:bg-[#5a0403] text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-[#770504] mr-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Checkout
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Shipping and Payment */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-2 text-[#770504]"
                    />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Full Address
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="mr-2 text-[#770504]"
                    />
                    Delivery Options
                  </h2>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          deliveryOption === option.id
                            ? "border-[#770504] bg-[#770504]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setDeliveryOption(option.id)}
                      >
                        <FontAwesomeIcon
                          icon={option.icon}
                          className={`mr-3 text-lg ${
                            deliveryOption === option.id
                              ? "text-[#770504]"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="flex-grow">
                          <div className="font-medium">{option.name}</div>
                          <div className="text-sm text-gray-600">
                            {option.days}
                          </div>
                        </div>
                        <div className="font-medium">
                          {option.cost > 0
                            ? `$${option.cost.toFixed(2)}`
                            : "FREE"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="mr-2 text-[#770504]"
                    />
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-[#770504] bg-[#770504]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <FontAwesomeIcon
                          icon={method.icon}
                          className={`text-2xl mb-2 ${
                            paymentMethod === method.id
                              ? "text-[#770504]"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="font-medium">{method.name}</div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Form (would show based on selected method) */}
                  {paymentMethod === "credit-card" && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#770504]"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({totalQuantity} items)
                      </span>
                      <span className="font-medium">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium">
                        {deliveryCharge > 0
                          ? `$${deliveryCharge.toFixed(2)}`
                          : "FREE"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#770504]">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Date Estimate */}
                  {selectedDelivery && (
                    <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-2 text-[#770504]"
                        />
                        <span>Estimated Delivery: {selectedDelivery.days}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#770504] hover:bg-[#5a0403] text-white py-3 rounded-md font-medium transition-colors"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    By placing your order, you agree to our{" "}
                    <Link
                      to="/terms"
                      className="text-[#770504] hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;

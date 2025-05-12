
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateCartItemQuantity,
  clearCart,
  removeItemFromCart,
} from "../redux/features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (totalQuantity === 0) {
    return (
      <>
       
        <div className="min-h-screen bg-gray-50 pt-12 lg:pt-20 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet
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
        
      </>
    );
  }

  return (
    <>
     
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
              Your Cart ({totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"})
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items - 2/3 width on desktop */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Cart Header - Desktop only */}
                <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-600">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-200 gap-4 md:gap-0"
                  >
                    {/* Product Info - Full width on mobile */}
                    <div className="md:col-span-5 flex items-start md:items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        {/* Mobile Price */}
                        <div className="md:hidden flex justify-between items-center mt-2">
                          <span className="text-gray-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 text-sm flex items-center mt-2 md:mt-1"
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price - Hidden on mobile */}
                    <div className="hidden  md:col-span-3 md:flex items-center text-center text-gray-600">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-600">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faMinus} size="xs" />
                        </button>
                        <span className="px-2 w-10 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={faPlus} size="xs" />
                        </button>
                      </div>
                    </div>

                    {/* Total - Hidden on mobile */}
                    <div className="hidden  md:flex justify-end items-center text-center text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <div className="p-4 text-right">
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary - 1/3 width on desktop */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#770504]">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#770504] hover:bg-[#5a0403] text-white py-3 rounded-md font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  or{" "}
                  <Link
                    to="/products"
                    className="text-[#770504] hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default CartPage;
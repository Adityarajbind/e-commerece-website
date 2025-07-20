import React, { useState, useContext, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const PromoCodes = ["FreeShipping", "SUMMER20"];
  const [msg, setmsg] = useState("");
  const [Code, setCode] = useState("");
  const [ogPrice, setOgPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);
  const [codeDiscount, setCodeDiscount] = useState(0);
  const handleApplyPromoCode = () => {
    if (PromoCodes.includes(Code)) {
      if (Code === "FreeShipping" && delivery === 0) {
        setmsg("Already applied");
        return;
      }
      if (Code === "FreeShipping") {
        let deliveryCharge = 0;
        if (subTotal > 0) {
          deliveryCharge =
            Code === "FreeShipping"
              ? 0
              : parseFloat((subTotal * 0.05).toFixed(2));
        }
        setDelivery(deliveryCharge);
        setmsg("Code Applied");
      }
      if (Code === "SUMMER20") {
        setCodeDiscount(0.2);
      }
    } else {
      setmsg("Invalid Promo Code");
    }
  };

  // ✅ Use effect to recalculate whenever cart changes
  useEffect(() => {
    let subtotal = 0;
    let original = 0;
    let discountVal = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
      original += (item.originalPrice ?? item.price) * item.quantity;
      discountVal +=
        ((item.originalPrice ?? item.price) - item.price) * item.quantity;
    });

    const discountPercent = original > 0 ? (discountVal / original) * 100 + codeDiscount * 100 : 0;
    setDiscountPercent(discountPercent.toFixed(0));

    const deliveryCharge =
      subtotal > 0 ? parseFloat((subtotal * 0.05).toFixed(2)) : 0;
    const discountedSubtotal = subtotal * (1 - codeDiscount);
    const totalAmount = discountedSubtotal + deliveryCharge;

    setSubTotal(discountedSubtotal);

    setOgPrice(original);
    setDiscount(discountVal);
    setDelivery(deliveryCharge);
    setTotal(totalAmount);
  }, [cart, codeDiscount]); // ✅ Recalculate when cart changes

  return (
    <>
      <Header />
      <div className="md:px-10 px-2 my-5 ">
        {cart.length > 0 ? (
          <>
            <h2 className="md:text-5xl text-3xl font-bold mb-5">Your Cart</h2>
            <div className="flex w-full gap-2 max-[768px]:flex-col">
              {/* Cart Items */}
              <div className="flex flex-col md:w-[70%] w-full border border-[#b2b2b2] dark:border-black rounded-2xl dark:bg-[var(--card-bg)] h-full">
                {cart.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <CartItem
                        item={item}
                        onUpdate={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                      {index !== cart.length - 1 && (
                        <div className="w-auto mx-2 h-[1px] bg-[#b2b2b2]"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="flex flex-col md:w-[30%] w-full h-full py-3 border rounded-2xl border-[#b2b2b2] dark:bg-[var(--card-bg)] dark:border-black">
                <h3 className="px-4 pb-3 text-[1.2rem] font-medium">
                  Order Summary
                </h3>
                <div className="flex justify-between px-4 py-1">
                  <div className="text-gray-600 dark:text-[var(--text-secondary)]">
                    SubTotal
                  </div>
                  <div className="font-medium">${subTotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between px-4 py-1">
                  <div className="text-gray-600 dark:text-[var(--text-secondary)]">
                    Discount (-{discountPercent}%)
                  </div>
                  <div className="font-medium text-red-600 dark:text-red-400">
                    -${discount.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between mx-4 py-1 pb-3 border-b border-[#b2b2b2]">
                  <div className="text-gray-600 dark:text-[var(--text-secondary)]">
                    Delivery
                  </div>
                  <div className="font-medium">${delivery.toFixed(2)}</div>
                </div>
                <div className="flex justify-between px-4 py-1 mt-3">
                  <div className="text-gray-600 dark:text-[var(--text-secondary)]">
                    Total
                  </div>
                  <div className="font-medium">${total.toFixed(2)}</div>
                </div>

                {/* Promo Code */}
                <div className="flex justify-center items-center mt-3 gap-2">
                  <div className="flex dark:bg-[var(--bg-main)] items-center rounded-3xl w-[63%] py-1 gap-2 px-3 border-[#b2b2b2] bg-[#dbdbdb] ">
                    <img
                      src="/icons/search.svg"
                      alt="search"
                      className="dark:invert"
                    />
                    <input
                      type="text"
                      placeholder="Apply Promo Code"
                      className="w-full bg-transparent outline-none text-xs"
                      value={Code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-black text-white px-6 py-2 rounded-full text-xs hover:bg-gray-800 transition"
                    onClick={handleApplyPromoCode}
                  >
                    Apply
                  </button>
                </div>
                <div
                  className={`text-xs text-center mt-2 ${
                    msg.includes("Invalid") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {msg}
                </div>

                <button className="bg-black w-[95%] text-white px-6 py-3 rounded-full text-xs hover:bg-gray-800 transition mt-3 mx-auto">
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-[80vh] flex flex-col items-center justify-center ">
            <img
              src="/icons/sadCart.svg"
              alt="Sad Cart"
              className="mx-auto sm:w-[50%] w-full h-[50%] object-contain invert-[30%]"
            />
            <div className="text-gray-200 mt-2 text-2xl">
              Your cart is empty
            </div>
            <div className="text-gray-500 max-[450px]:text-xs">
              Add Something to make me Happy!
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

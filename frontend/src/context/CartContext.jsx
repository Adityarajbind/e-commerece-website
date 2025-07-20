import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [storageKey, setStorageKey] = useState(null);

  // Load user & set correct storageKey
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const key = storedUser ? `cart_${storedUser.id}` : "cart_guest";
    setStorageKey(key);
  }, []);

  //  Once storageKey is available, load cart
  useEffect(() => {
    if (!storageKey) return; // Skip until storageKey is ready
    const storedCart = localStorage.getItem(storageKey);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
  }, [storageKey]);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: item.quantity }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, updateQuantity, clearCart,removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

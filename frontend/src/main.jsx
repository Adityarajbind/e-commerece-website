
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
 
    <CartProvider>
      <App />
    </CartProvider>
);

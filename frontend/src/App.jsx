import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopbtn from "./components/ScrollToTopbtn";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTopbtn />
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;

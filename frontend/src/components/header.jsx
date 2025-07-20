import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data";
import AccountSidebar from "./AccountSidebar";

const navItems = ["Shop ⋁", "On sale", "New Arrivals", "Brands"];

const Header = () => {
  const navigate = useNavigate();
  const [hamburger, setHamburger] = useState(false);
  const [hamburgerClosing, setHamburgerClosing] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleToggleWithAnimation = (isOpen, setOpen, setClosing) => {
    if (isOpen) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 300);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center h-[10vh] w-full px-4 max-[769px]:px-0 border-b border-[#f0f0f0] dark:border-[var(--card-bg)] ">
        {/* Hamburger + Small Logo (mobile only) */}
        <button
          className="cursor-pointer  hidden max-[769px]:flex"
          onClick={() =>
            handleToggleWithAnimation(
              hamburger,
              setHamburger,
              setHamburgerClosing
            )
          }
        >
          <img src="/icons/Menu.png" alt="menu" className="dark:invert" />
        </button>
        <button
          id="logo"
          className="w-[30%] mr-auto cursor-pointer min-[769px]:hidden"
          onClick={() => navigate("/")}
        >
          <img src="/icons/SHOPCO.svg" alt="logo" className="dark:invert" />
        </button>

        {/* Main Logo (hidden on mobile) */}
        <button
          id="mainlogo"
          className="flex items-center justify-center max-[769px]:hidden cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/icons/SHOPCO.svg" alt="logo" className="dark:invert" />
        </button>

        {/* Navigation (hidden on mobile) */}
        <nav className="navigation hidden min-[769px]:flex  justify-between items-center">
          <ul className="flex">
            {navItems.map((item) => (
              <li key={item} className="p-[6px]">
                <a
                  href="#"
                  className="cursor-pointer rounded hover:text-gray-700 dark:hover:text-[var(--text-primary)] hover:bg-gray-200 dark:hover:bg-gray-800 block text-[#868686] dark:text-[var(--text-primary)]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative hidden min-[769px]:flex flex-col w-[34%] h-full justify-center items-center">
          {/* Search Bar */}
          <div className="search-bar hidden min-[769px]:flex bg-[#ffffff] dark:bg-[var(--card-bg)] items-center h-3/4 rounded-3xl gap-2 px-3 w-full">
            <img src="/icons/search.svg" alt="search" className="dark:invert" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-white dark:bg-[#3a3a3a] rounded shadow z-50 max-h-60 overflow-y-hidden">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setSearch(false);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 ">
          <button
            className="bg-[#f0f0f0] dark:bg-[var(--card-bg)] rounded-full p-2 cursor-pointer hidden max-[769px]:flex"
            onClick={() =>
              handleToggleWithAnimation(search, setSearch, setSearchClosing)
            }
          >
            <img src="/icons/search.svg" className="dark:invert" alt="search" />
          </button>

          <button
            className="bg-[#f0f0f0] dark:bg-[var(--card-bg)] rounded-full p-2 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src="/icons/cart.png" className="dark:invert" alt="cart" />
          </button>

          <AccountSidebar />
        </div>
      </header>

      {/* Mobile Search Bar */}
      {search && (
        <div className="flex justify-center items-center w-full absolute z-20">
          <div
            className={`bg-[#f0f0f0] w-4/5 h-[2.8rem] rounded-3xl flex items-center px-3 transition-all duration-300 ease-in-out ${
              searchClosing ? "animate-fade-out" : "animate-fade-in"
            } border dark:bg-[var(--card-bg)] `}
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>
      )}

      {/* Mobile Hamburger Menu */}
      {hamburger && (
        <div className="flex justify-center items-center w-full ">
          <nav
            className={`bg-[#f0f0f0] dark:bg-[var(--card-bg)] border-b absolute top-0 left-0 z-20 w-full flex flex-col gap-1 transition-all duration-300 ease-in-out ${
              hamburgerClosing ? "animate-slide-out" : "animate-slide-in"
            }`}
          >
            <button
              className="h-4 w-4 self-end m-2"
              onClick={() =>
                handleToggleWithAnimation(
                  hamburger,
                  setHamburger,
                  setHamburgerClosing
                )
              }
            >
              <img
                src="/icons/Close-1.png"
                alt="close"
                className="w-full h-full dark:invert"
              />
            </button>
            <ul className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <li
                  key={item}
                  className="p-2 hover:bg-[#bdbdbd] rounded w-[95%] text-center"
                >
                  <a href="#" className="block hover:text-gray-700">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {searchResults.length > 0 && search && (
        <ul
          className={`absolute w-[80%] bg-white dark:bg-[#3a3a3a] rounded shadow z-50 max-h-60 overflow-y-hidden left-1/2 transform -translate-x-1/2 mt-12 transition-all duration-300 ease-in-out ${
            searchClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          {searchResults.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`);
                setSearch(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Header;

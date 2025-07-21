import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

const AccountSidebar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch("https://e-commerece-website-backend.onrender.com/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, email: data.email });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Account Button */}
      <button
        className="bg-[#f0f0f0] dark:bg-[var(--card-bg)] rounded-full p-2 cursor-pointer"
        onClick={toggleSidebar}
      >
        <img src="/icons/profile.svg" className="dark:invert" alt="profile" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#000000b6] bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 w-80 h-full bg-[#e8e8e8] dark:bg-[var(--bg-section)] text-black dark:text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } shadow-xl p-6 overflow-y-auto rounded`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">My Account</h2>
          <button
            onClick={toggleSidebar}
            className="text-sm text-gray-400 hover:text-white"
          >
            <img
              src="/icons/cross.svg"
              className="dark:invert cursor-pointer"
              alt="close"
            />
          </button>
        </div>

        {/* User Info */}
        <div className="space-y-1 mb-6">
          {/* User Info */}
          <div className="space-y-1 mb-6">
            {loading ? (
              <div className="flex items-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-400">Loading...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <FaUser className="text-lg" />
                  <span className="font-medium">
                    {user.name || "Guest User"}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {user.email || "Not signed in"}
                </p>
              </>
            )}
          </div>
        </div>

        <hr className="border-gray-700 my-4" />

        {/* Actions */}
        <ul className="space-y-4">
          <li>
            <button className="w-full text-left hover:text-blue-500">
              🔐 Change Password
            </button>
          </li>
          <li>
            <button className="w-full text-left hover:text-blue-500">
              📦 Order History
            </button>
          </li>
          <li>
            <button className="w-full text-left hover:text-blue-500">
              ⚙️ Profile Settings
            </button>
          </li>
          <li>
            <button className="w-full text-left hover:text-blue-500">
              ❓ FAQ / Help
            </button>
          </li>
          <li className="flex items-center justify-between w-full">
            <span>🌓 Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className="text-yellow-400 cursor-pointer hover:text-yellow-300 w-1/4"
              aria-label="Toggle Dark Mode"
            >
              {!darkMode ? (
                <img src="/assets/light.svg" alt="Light Mode" />
              ) : (
                <img src="/assets/dark.svg" alt="Dark Mode" />
              )}
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="w-full text-left text-red-500 hover:text-red-400 flex items-center gap-2 cursor-pointer">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AccountSidebar;

import React from "react";

const AccountTabs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center max-w-7xl mx-auto mb-10">
        <div className="text-2xl font-bold">SHOP.CO</div>
        <ul className="flex gap-6 text-gray-300 text-sm">
          <li><a href="#" className="hover:text-white">Shop</a></li>
          <li><a href="#" className="hover:text-white">Orders</a></li>
          <li><a href="#" className="hover:text-white">Log Out</a></li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt="User Avatar"
            className="w-24 h-24 mx-auto rounded-full border-4 border-white mb-4"
          />
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-gray-400 text-sm mt-1">Member since 2023</p>
        </div>

        {/* Tab Navigation + Content */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium">
              Profile Info
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium">
              Order History
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium">
              Saved Items
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium">
              Settings
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <form className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="text"
                placeholder="Shipping Address"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                onClick={(e) => e.preventDefault()}
                className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 mt-4 md:col-span-2"
              >
                Update Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;

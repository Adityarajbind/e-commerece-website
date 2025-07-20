import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full relative md:mt-25 mt-30">
      {/* newletter sub box */}
      <div className="bg-black text-white rounded-[0.5rem] p-4 flex flex-col md:flex-row items-center justify-between  w-[85%] m-auto absolute md:top-[-15%] top-[-10%] left-1/2 -translate-x-1/2">
        <h2 class="text-2xl md:text-3xl font-extrabold leading-snug">
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>

        <div class="flex flex-col gap-2 md:w-auto">
          <div class="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-80 gap-1">
            <img src="/icons/search.svg" alt="" />
            <input
              type="email"
              placeholder="Enter your email address"
              class="outline-none bg-transparent text-black w-full text-sm placeholder-gray-500"
            />
          </div>

          <button class="bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-[var(--card-bg)] text-gray-700 py-10 px-6 md:px-16 w-full pt-30">
        <div className="w-full mx-auto md:flex justify-center mt-1">
          {/* Shop.co Info */}
          <div className="space-y-4 max-[398px]:mt-10 ">
            <h2 className="text-2xl font-extrabold text-black dark:text-[var(--text-primary)] cursor-pointer" onClick={() => navigate("/")}>SHOP.CO</h2>
            <p className="text-xs dark:text-[var(--text-secondary)]">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex space-x-4 mb-5">
              <a href="#">
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-5 h-5"
                />
              </a>
              <a href="https://youtu.be/dQw4w9WgXcQ?si=QZRqyjZ-XciITAiM">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#">
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
              <a href="#">
                <img
                  src="/icons/github.svg"
                  alt="Github"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          <div className="max-[769px]:grid max-[769px]:grid-cols-2 max-[769px]:gap-6  md:flex md:gap-10">
          {/* Company */}
          <div className="flex flex-col items-center ">
            <h3 className="mb-2 dark:text-white ">COMPANY</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-[0.75rem]">About</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Features</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Works</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Career</a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col items-center ">
            <h3 className="mb-2 dark:text-white ">HELP</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Customer Support</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Delivery Details</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="flex flex-col items-center ">
            <h3 className="mb-2 dark:text-white ">FAQ</h3>
            <ul className="space-y-1 text-sm ">
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Account</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Manage Deliveries</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Orders</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Payments</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center ">
            <h3 className="mb-2 dark:text-white ">RESOURCES</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Free eBooks</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Development Tutorial</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">How to - Blog</a>
              </li>
              <li>
                <a href="#" className="dark:text-[var(--text-secondary)] text-xs">Youtube Playlist</a>
              </li>
            </ul>
          </div>
        </div>
          </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-400 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="dark:text-[var(--text-secondary)]">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-3 mt-4 md:mt-0 flex-wrap gap-2">
            <img src="/icons/Visa.svg" alt="Visa" className="h-7  p-1 bg-white rounded" />
            <img src="/icons/Mastercard.svg" alt="MasterCard" className="h-7  p-1 bg-white rounded" />
            <img src="/icons/Paypal.svg" alt="PayPal" className="h-7  p-1 bg-white rounded" />
            <img src="/icons/apple Pay.svg" alt="Apple Pay" className="h-7  p-1 bg-white rounded" />
            <img src="/icons/GPay.svg" alt="Google Pay" className="h-7  p-1 bg-white rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

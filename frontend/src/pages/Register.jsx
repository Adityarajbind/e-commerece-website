import { useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  fade: true,
};

const images = [
  "force-majeure-unsplash.jpg",
  "mike-von-unsplash.jpg",
  "force-unsplash.jpg",
  "chimi-davila-unsplash.jpg",
  "tyrell-james-unsplash.jpg",
];
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedForm = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    try {
      await axios.post("https://e-commerece-website-backend.onrender.com/api/auth/register", cleanedForm);
      setForm({ username: "", email: "", password: "" });
      setMsg("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setMsg(errorMsg);
    }
  };

  return (
    <>
      <span className="message bg-yellow-700 px-2 rounded m-1 absolute top-0 z-99">
        {msg}
      </span>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white relative">
        {/* Left Image with Slider */}
        <div className="z-0 h-screen">
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <div
                  className="h-screen w-full bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url('/assets/${image}')`,
                  }}
                ></div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Form */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-8 max-[350px]:px-4 md:static md:px-10 bg-white/80 md:bg-gray-300 z-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-black mb-2">
              Create Account
            </h2>
            <p className="text-gray-700 mb-6">
              Sign up to start shopping stylishly
            </p>

            <form className="space-y-5">
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-black"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-1 outline-gray-500 bg-white text-black"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-black"
                  htmlFor="regemail"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="regemail"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-1 outline-gray-500 bg-white text-black"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-black"
                  htmlFor="regpassword"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="regpassword"
                  placeholder="Create a password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-1 outline-gray-500 bg-white text-black"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  autoComplete="off"
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-black font-medium underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
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
  "chimi-davila-unsplash.jpg",
  "tyrell-james-unsplash.jpg",
  "force-unsplash.jpg",
  "force-majeure-unsplash.jpg",
  "mike-von-unsplash.jpg",
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerece-website-backend.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // or user dashboard
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <span className="message bg-yellow-700 px-2 rounded m-1 absolute top-0 z-99">
        {msg}
      </span>
      <div className="h-full grid grid-cols-1 md:grid-cols-2 bg-white relative">
        {/* Left Image */}
        <div className="h-screen z-0">
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
            <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
            <p className="text-gray-700 mb-6">Login to your Shop.co account</p>

            <form className="space-y-5">
              {/* Email */}
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-black"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-1 outline-gray-500 bg-white text-black"
                  autoComplete="off"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-black"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Your password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-1 outline-gray-500 bg-white text-black"
                  autoComplete="off"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-700">
              Don’t have an account?{" "}
              <a href="/register" className="text-black font-medium underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

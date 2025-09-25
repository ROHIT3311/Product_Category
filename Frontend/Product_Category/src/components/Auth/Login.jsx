import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthState } from "../../services/authSlice";
import ReCAPTCHA from "react-google-recaptcha";

// const RECAPTCHA_SITE_KEY = "6LfGU5IrAAAAAJ5v9Gfd-jKeKtRqi04WpFoF_QwS";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetAuthState()); // 👈 resets state when Login screen loads
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/verify-otp");
      dispatch(resetAuthState());
    }
  }, [success, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }
    dispatch(login({ email: form.email, password: form.password }));
  };

  console.log("Captcha : ", import.meta.env.VITE_RECAPTCHA_SITE_KEY);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="animate-fade-in bg-white border border-blue-100 shadow-md rounded-2xl p-8 w-full max-w-md transition duration-300 ease-in-out"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-8 8a8 8 0 1116 0H2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-sm"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-sm"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border rounded"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-center mt-2">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !captchaVerified}
          className={`w-full mt-6 font-semibold py-2 rounded-xl transition-all duration-200 shadow ${
            loading || !captchaVerified
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

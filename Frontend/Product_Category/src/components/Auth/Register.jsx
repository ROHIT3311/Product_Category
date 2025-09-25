import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthState } from "../../services/authSlice";
import { useNavigate } from "react-router-dom";

const commonDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "rediffmail.com",
];

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company_name: "",
    pid: "",
    password: "",
    agree: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) {
          message = `${
            name === "firstName" ? "First" : "Last"
          } Name is required`;
        } else if (!/^[A-Z][a-z]*$/.test(value)) {
          message = `${
            name === "firstName" ? "First" : "Last"
          } Name must start with a capital letter`;
        }
        break;

      case "company_name":
        if (!value) {
          message = "Company Name is required";
        } else if (value.length < 2) {
          message = "Company Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value) {
          message = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Valid email is required";
        } else {
          const domain = value.split("@")[1];
          if (commonDomains.includes(domain)) {
            message =
              "Public email domains are not allowed. Use your official email.";
          }
        }
        break;

      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 5) {
          message = "Password must be at least 5 characters";
        } else if (!/[A-Z]/.test(value)) {
          message = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(value)) {
          message = "Password must contain at least one number";
        } else if (!/[\W_]/.test(value)) {
          message = "Password must contain at least one special character";
        }
        break;

      case "pid":
        if (!value) {
          message = "PID is required";
        }
        break;

      default:
        break;
    }

    setValidationErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    // Auto-capitalize first letter for names and company name
    if (["firstName", "lastName", "company_name"].includes(name) && val) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    setForm((prev) => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation check
    Object.keys(form).forEach((field) => validateField(field, form[field]));

    const hasErrors = Object.values(validationErrors).some((msg) => msg);
    if (!hasErrors) {
      dispatch(register(form));
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join us to request and track spare parts
          </p>
        </div>

        <div className="space-y-4">
          {[
            "firstName",
            "lastName",
            "email",
            "company_name",
            "pid",
            "password",
          ].map((field) => (
            <div key={field} className="space-y-1">
              <input
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "pid"
                    ? "Enter your personal ID"
                    : field === "company_name"
                    ? "Enter your company name"
                    : `Enter your ${field
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`
                }
                value={form[field]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  validationErrors[field] ? "border-red-400" : "border-gray-300"
                } rounded-xl focus:outline-none focus:ring-2 ${
                  validationErrors[field]
                    ? "focus:ring-red-300"
                    : "focus:ring-blue-300"
                } transition-all placeholder-gray-400 text-sm`}
              />
              {validationErrors[field] && (
                <p className="text-red-500 text-xs">
                  {validationErrors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
        {success && (
          <div className="text-green-500 mt-4 text-sm">
            Registration successful!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Create Account"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline transition">
            Sign in here
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

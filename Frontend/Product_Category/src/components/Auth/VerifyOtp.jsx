import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../services/authSlice";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 6;
const COUNTDOWN = 300; // 5 minutes

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(COUNTDOWN);
  const [resendAvailable, setResendAvailable] = useState(false);
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) navigate("/");
  }, [success, navigate]);

  useEffect(() => {
    if (!timer) {
      setResendAvailable(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 1) return;
    const nextOtp = [...otp];
    nextOtp[idx] = val;
    setOtp(nextOtp);
    if (val && idx < OTP_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(COUNTDOWN);
    setResendAvailable(false);
    // Optional: dispatch resendOtp()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) return;
    dispatch(verifyOtp({ otp: code }));
  };

  const seconds = String(timer % 60).padStart(2, "0");
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-100 rounded-2xl p-8 w-full max-w-md shadow-lg transition-all"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Enter Verification Code
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Check your email for the 6-digit code.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              autoFocus={idx === 0}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          ))}
        </div>

        <div className="text-sm text-gray-600 mb-4 text-center">
          Code expires in{" "}
          <span className="font-semibold text-blue-600">
            {minutes}:{seconds}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-2 rounded-xl font-semibold transition-all shadow ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center mt-3">{error}</div>
        )}

        <div className="mt-4 text-sm text-center">
          Didn’t receive the code?
          <button
            type="button"
            onClick={handleResend}
            disabled={!resendAvailable}
            className="ml-2 text-blue-600 font-medium hover:underline disabled:text-gray-400"
          >
            Resend Code
          </button>
        </div>

        <div className="text-center text-xs text-gray-400 mt-1">
          {resendAvailable
            ? "You can request a new code now"
            : `Wait: ${minutes}:${seconds}`}
        </div>

        <div className="mt-6 bg-gray-100 border rounded p-3 text-sm text-gray-700">
          <p className="font-semibold text-xs mb-1">Security Notice</p>
          <p className="text-xs">
            Never share this code. Our team will never ask for your verification
            code.
          </p>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;

import "./App.css";
import HomePage from "./components/Home_Page/HomePage";
import Register from "./components/Auth/Register";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import VerifyOTP from "./components/Auth/VerifyOtp";
import Category_A from "./components/Category/Category_A";
import Category_C from "./components/Category/Category_C";
import Category_B from "./components/Category/Category_B";
import Navbar from "./components/Navbar/Navbar";
import Product_Category from "./components/Product_Category/Product_Category";
import { useEffect } from "react";

function AppLayout() {
  const location = useLocation();

  // Paths where you do NOT want the navbar
  const hideNavbarRoutes = ["/login", "/register", "/verify-otp"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/categoryA" element={<Category_A />} />
        <Route path="/categoryB" element={<Category_B />} />
        <Route path="/categoryC" element={<Category_C />} />
        <Route path="/catalog" element={<Product_Category />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

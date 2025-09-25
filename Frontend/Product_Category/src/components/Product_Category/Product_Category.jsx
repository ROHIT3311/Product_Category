import React from "react";
import { useNavigate } from "react-router-dom";

const Product_Category = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Category A", path: "/categoryA" },
    { name: "Category B", path: "/categoryB" },
    { name: "Category C", path: "/categoryC" },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-blue-600 h-12 text-white flex items-center px-4 shadow-md">
        <p className="font-semibold text-lg">Product Category</p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => navigate(cat.path)}
            className="h-40 flex items-center justify-center text-lg font-semibold text-blue-700 
                       bg-white border border-blue-200 rounded-xl shadow-md 
                       hover:shadow-xl hover:scale-105 hover:border-blue-500 
                       transition duration-300"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Product_Category;

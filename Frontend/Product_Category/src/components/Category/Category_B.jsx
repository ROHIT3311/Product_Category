import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendProductInfo } from "../../services/partSlice"; // adjust path

const Category_B = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.part);

  const [form, setForm] = useState({
    email: "",
    productCode: "",
    productName: "",
    modelCode: "",
    modelName: "",
    notes: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { email, productCode, productName, modelCode, modelName } = form;
      await dispatch(
        sendProductInfo({
          email,
          productCode,
          productName,
          modelCode,
          modelName,
        })
      ).unwrap();

      setSuccessMsg("✅ Request sent successfully!");
      setForm({
        email: "",
        productCode: "",
        productName: "",
        modelCode: "",
        modelName: "",
        notes: "",
      });
    } catch (err) {
      setErrorMsg("❌ Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    setForm({
      email: "",
      productCode: "",
      productName: "",
      modelCode: "",
      modelName: "",
      notes: "",
    });
    setSuccessMsg("");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-3">
      {/* Card */}
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4">
          <h2 className="text-white font-semibold text-lg">
            Request Spare Parts
          </h2>
          <p className="text-blue-100 text-sm">
            Fill out the form below to send a request
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            {
              label: "Email Address",
              name: "email",
              type: "email",
              required: true,
              placeholder: "Enter your email address",
            },
            {
              label: "Product Code",
              name: "productCode",
              type: "text",
              required: true,
              placeholder: "e.g., PC-2025-001",
            },
            {
              label: "Product Name",
              name: "productName",
              type: "text",
              required: true,
              placeholder: "Enter product name",
            },
            {
              label: "Model Code",
              name: "modelCode",
              type: "text",
              required: true,
              placeholder: "e.g., MC-2025-A1",
            },
            {
              label: "Model Name",
              name: "modelName",
              type: "text",
              required: true,
              placeholder: "Enter model name",
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              name="notes"
              rows={3}
              placeholder="Add any extra details..."
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>

          {/* Feedback */}
          {successMsg && (
            <div className="mt-3 p-2 text-sm text-green-700 bg-green-100 rounded">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mt-3 p-2 text-sm text-red-700 bg-red-100 rounded">
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      {/* Help Box */}
      <div className="mt-10 w-full max-w-lg bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M12 16v-4m0 0V8m0 4h.01"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold text-sm text-blue-700">
            Need Help?
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <div className="font-semibold mb-1">Finding Product Info</div>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Check your product manual</li>
              <li>Look for labels on the equipment</li>
              <li>Use our parts search feature</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Contact Support</div>
            <p className="text-gray-600">support@sparepartspro.com</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category_B;

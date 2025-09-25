import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByVin, searchParts } from "../../services/partSlice";

const Category_A = () => {
  const [spn, setSpn] = useState("");
  const [modelName, setModelName] = useState("");
  const [productName, setProductName] = useState("");
  const [partNo, setPartNo] = useState("");
  const [lastSearchedBy, setLastSearchedBy] = useState("");

  const dispatch = useDispatch();
  const { parts, loading, error } = useSelector((state) => state.part);

  // SPN search
  const handleVinSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByVin(spn));
    setLastSearchedBy("spn");
  };

  // Detailed part search
  const handlePartSubmit = (e) => {
    e.preventDefault();
    dispatch(
      searchParts({
        product_name: productName,
        model_name: modelName,
        part_no: partNo,
      })
    );
    setLastSearchedBy("part");
  };

  useEffect(() => {
    if (parts && parts.length > 0) {
      setSpn("");
      setModelName("");
      setProductName("");
      setPartNo("");
    }
  }, [parts]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="grid md:grid-cols-2 gap-8 mx-auto">
        {/* SPN Search Form */}
        <form
          onSubmit={handleVinSubmit}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col justify-between"
          style={{ minHeight: "350px" }}
        >
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
              🔍 Search by SPN Number
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Enter your vehicle's <strong>SPN number</strong> to quickly find
              matching parts.
            </p>
            <input
              className="w-full mb-3 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={spn}
              onChange={(e) => setSpn(e.target.value)}
              placeholder="e.g. SPN12345"
              maxLength={17}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading && lastSearchedBy === "spn"
                ? "Searching..."
                : "Search by SPN"}
            </button>
            {error && lastSearchedBy === "spn" && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </form>

        {/* Detailed Part Search Form */}
        <form
          onSubmit={handlePartSubmit}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition flex flex-col justify-between"
          style={{ minHeight: "350px" }}
        >
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
              ⚙️ Detailed Part Search
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Search using <strong>product</strong>, <strong>model</strong>, and
              optionally <strong>part no</strong>.
            </p>

            {/* Product Select */}
            <select
              className="w-full rounded-lg border px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              <option value="">Select Product</option>
              <option value="HSG">HSG</option>
              <option value="GFB">GFB</option>
              <option value="GSFI">GSFI</option>
              <option value="Coater">Coater</option>
            </select>

            {/* Model Name */}
            <input
              className="w-full rounded-lg border px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
            />

            {/* Part No (Optional) */}
            <input
              className="w-full rounded-lg border px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={partNo}
              onChange={(e) => setPartNo(e.target.value)}
              placeholder="Enter part no (optional)"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading && lastSearchedBy === "part"
                ? "Searching..."
                : "Search Parts"}
            </button>
            {error && lastSearchedBy === "part" && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {parts && parts.length > 0 && (
        <div className="mt-10 mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Search Results
          </h3>

          {lastSearchedBy === "spn" ? (
            // SPN → show projects
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {parts.map((part) => (
                <div
                  key={part._id}
                  className="border rounded-lg border-blue-600 shadow-sm bg-white hover:shadow-md transition overflow-hidden p-6"
                >
                  <p className="font-semibold text-gray-700 mb-4">
                    SPN No: <span className="text-blue-600">{part.spn}</span>
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Projects:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {part.projects.map((proj, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        <span className="font-semibold">{proj.projectNo}</span>{" "}
                        – {proj.projectName} ({proj.company})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            // Detailed search → show projects OR image
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {parts[0].projectNo ? (
                parts.map((proj, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg border-blue-600 shadow-sm bg-white hover:shadow-md transition overflow-hidden p-6"
                  >
                    <p className="text-gray-700">
                      <span className="font-semibold">Project No:</span>{" "}
                      {proj.projectNo}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Project Name:</span>{" "}
                      {proj.projectName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Company:</span>{" "}
                      {proj.company}
                    </p>
                  </div>
                ))
              ) : (
                <div className="border rounded-lg border-blue-600 shadow-sm bg-white hover:shadow-md transition overflow-hidden p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Part No : {parts[0].part_no}
                  </h3>
                  {parts[0].img_link && (
                    <img
                      src={parts[0].img_link}
                      alt="Part"
                      className="w-full h-64 object-contain"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category_A;

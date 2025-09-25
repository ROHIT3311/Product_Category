// partSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://product-category-sget.vercel.app";

// Async thunk for searching by VIN
// partSlice.js
export const searchByVin = createAsyncThunk(
  "part/searchByVin",
  async (spn, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/part/searchByVin?spn=${spn}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Search Failed");
    }
  }
);

// Async thunk for detailed part search
export const searchParts = createAsyncThunk(
  "part/searchParts",
  async ({ part_no, product_name, model_name }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (part_no) queryParams.append("part_no", part_no);
      if (product_name) queryParams.append("product_name", product_name);
      if (model_name) queryParams.append("model_name", model_name);

      const response = await axios.get(
        `${BASE_URL}/api/part/searchParts?${queryParams.toString()}`
      );

      // ✅ Always return an array
      if (response.data.projects) {
        return response.data.projects;
      } else if (response.data.img_link) {
        return [
          { img_link: response.data.img_link, part_no: response.data.part_no },
        ];
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Part Search Failed"
      );
    }
  }
);

// partSlice.js
export const sendProductInfo = createAsyncThunk(
  "part/sendProductInfo",
  async (
    { email, productCode, productName, modelCode, modelName },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/req/reqPart`, {
        email,
        productCode,
        productName,
        modelCode,
        modelName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send product info"
      );
    }
  }
);

const partSlice = createSlice({
  name: "part",
  initialState: {
    parts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Search by Vin
      .addCase(searchByVin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchByVin.fulfilled, (state, action) => {
        state.loading = false;
        state.parts = action.payload.Parts;
      })
      .addCase(searchByVin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //   Search by Model, Product, Color
      .addCase(searchParts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchParts.fulfilled, (state, action) => {
        state.loading = false;
        state.parts = action.payload; // Note: `parts` from backend response
      })
      .addCase(searchParts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send requested part by email
      .addCase(sendProductInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendProductInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.parts = action.payload.parts;
      })
      .addCase(sendProductInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default partSlice.reducer;

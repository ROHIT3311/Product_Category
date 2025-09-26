import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://product-category-sget.vercel.app";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ Global setting
});

export const register = createAsyncThunk(
  "auth/register",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", FormData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", FormData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/verify-otp", {
        otp,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP Verification Failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/logout", {});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Sign out failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        };
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user || state.user;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.success = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;

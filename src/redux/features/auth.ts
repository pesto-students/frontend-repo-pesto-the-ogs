import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const login = createAsyncThunk("auth/login");

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;

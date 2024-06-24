import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const login = createAsyncThunk("auth/login");

const initialState = {
  goals: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {},
});

export default goalSlice.reducer;

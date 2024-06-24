import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const login = createAsyncThunk("auth/login");

const initialState = {
  incomesAndExpenses: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const incomeAndExpenseSlice = createSlice({
  name: "incomeAndExpense",
  initialState,
  reducers: {},
});

export default incomeAndExpenseSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncTaskStatusEnum } from "../../constants/asyncTask";
import {
  IAddIncomeAndExpensePayload,
  IIncomeAndExpense,
  IIncomeAndExpenseState,
  UpdateIncomeAndExpensePayloadType,
} from "../../types/incomeAndExpense";

const initialState: IIncomeAndExpenseState = {
  incomes: {},
  expenses: {},
  status: AsyncTaskStatusEnum.Idle, // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const addIncomeAndExpense = createAsyncThunk<
  IIncomeAndExpense,
  IAddIncomeAndExpensePayload,
  { rejectValue: string }
>("incomeAndExpense/addFinance", async (financeData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/finances", financeData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateFinance = createAsyncThunk<
  IIncomeAndExpense,
  UpdateIncomeAndExpensePayloadType,
  { rejectValue: string }
>("incomeAndExpense/updateFinance", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put<IIncomeAndExpense>(
      `/api/finances/${data.expense_earning_id}`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for deleting a finance entry
export const deleteFinance = createAsyncThunk<
  IIncomeAndExpense["expense_earning_id"],
  IIncomeAndExpense["expense_earning_id"],
  { rejectValue: string }
>("incomeAndExpense/deleteFinance", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/finances/${id}`);
    return id;
  } catch (error: unknown) {
    return rejectWithValue(error.response.data);
  }
});

export const incomeAndExpenseSlice = createSlice({
  name: "incomeAndExpense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIncomeAndExpense.pending, (state) => {
        state.status = AsyncTaskStatusEnum.Loading;
      })
      .addCase(
        addIncomeAndExpense.fulfilled,
        (state, action: PayloadAction<IIncomeAndExpense>) => {
          const finance = action.payload;
          if (finance.is_expense) {
            state.expenses[finance.expense_earning_id] = finance;
          } else if (finance.is_earning) {
            state.incomes[finance.expense_earning_id] = finance;
          }
          state.status = AsyncTaskStatusEnum.Succeeded;
        }
      )
      .addCase(addIncomeAndExpense.rejected, (state) => {
        state.status = AsyncTaskStatusEnum.Failed;
      })
      .addCase(
        updateFinance.fulfilled,
        (state, action: PayloadAction<IIncomeAndExpense>) => {
          const finance = action.payload;
          if (finance.is_expense) {
            state.expenses[finance.expense_earning_id] = finance;
          } else if (finance.is_earning) {
            state.incomes[finance.expense_earning_id] = finance;
          }
        }
      )
      .addCase(
        deleteFinance.fulfilled,
        (state, action: PayloadAction<number>) => {
          delete state.expenses[action.payload];
          delete state.incomes[action.payload];
        }
      );
  },
});

export default incomeAndExpenseSlice.reducer;

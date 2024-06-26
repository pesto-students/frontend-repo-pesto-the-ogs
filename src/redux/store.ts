import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth";
import GoalReducer from "./features/goal";
import IncomeAndExpenseReucer from "./features/incomeAndExpense";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    goal: GoalReducer,
    incomeAndExpense: IncomeAndExpenseReucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

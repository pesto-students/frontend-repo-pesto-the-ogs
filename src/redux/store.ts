import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth";
import GoalReducer from "./features/goal";
import IncomeAndExpenseReucer from "./features/incomeAndExpense";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    goal: GoalReducer,
    incomeAndExpense: IncomeAndExpenseReucer,
  },
});

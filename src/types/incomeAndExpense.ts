import { AsyncTaskStatusEnum } from "../constants/asyncTask";

export interface IIncomeAndExpenseState {
  incomes: { [key: number]: IIncomeAndExpense };
  expenses: { [key: number]: IIncomeAndExpense };
  status: AsyncTaskStatusEnum;
  error: boolean | null;
}

export type IncomeSourceType = "primary" | "secondary";
export type TransactionType = "income" | "expense";

export interface IIncomeAndExpense {
  expense_earning_id: number;
  is_expense: boolean;
  is_earning: boolean;
  expense_date: string;
  user_id: string;
  name: string;
  description: string;
  created_date: string;
  updated_date: string;
  amount: string;
  income_source?: IncomeSourceType;
  is_recurring: boolean;
}

export interface IAddIncomeAndExpensePayload {
  type: TransactionType;
  amount: number;
  description: string;
  income_source?: IncomeSourceType; // This field is optional and only for type "income"
  income_type?: "fixed" | "variable"; // This field is optional and only for type "income"
  date?: string; // Optional for income but mandatory for expense: If not provided, the current date can be assumed
  is_recurring: boolean;
}

export type UpdateIncomeAndExpensePayloadType = {
  [Property in keyof Omit<
    IIncomeAndExpense,
    "expense_earning_id"
  >]?: IIncomeAndExpense[Property];
} & Pick<IIncomeAndExpense, "expense_earning_id">;

import { useState, ChangeEvent, FormEvent } from "react";
import {
  IncomeSourceType,
  TransactionType,
} from "../../types/incomeAndExpense";
import { IObject } from "../../types/common";

interface IFormData {
  title: string;
  description: string;
  amount: string;
  type: TransactionType;
  isRecurring: boolean;
  incomeSourceType: IncomeSourceType;
  expenseDate?: string; // New field for expense date
}

interface IAddIncomeAndExpenseFormProps {
  onSubmit(data: IObject): void;
}

function AddIncomeAndExpenseForm({ onSubmit }: IAddIncomeAndExpenseFormProps) {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: "",
    amount: "",
    type: "expense",
    isRecurring: false,
    incomeSourceType: "primary",
    expenseDate: new Date().toISOString().split("T")[0], // Set default to today's date
  });

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      onSubmit(formData);
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      console.log("Success:", data);
      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto md:w-1/2">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="py-3 px-2 mt-1  block w-full rounded-md border-gray-600 border-solid border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="py-3 px-2 mt-1 block w-full rounded-md border-gray-600 border-solid border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type:
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label htmlFor="isRecurring" className="flex items-center">
          <input
            type="checkbox"
            id="isRecurring"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Is Recurring</span>
        </label>
      </div>
      {formData.type === "income" && (
        <div>
          <label
            htmlFor="incomeSourceType"
            className="block text-sm font-medium text-gray-700"
          >
            Income Source Type:
          </label>
          <select
            id="incomeSourceType"
            name="incomeSourceType"
            value={formData.incomeSourceType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>
      )}
      {formData.type === "expense" && (
        <div>
          <label
            htmlFor="expenseDate"
            className="block text-sm font-medium text-gray-700"
          >
            Expense Date:
          </label>
          <input
            type="date"
            id="expenseDate"
            name="expenseDate"
            value={formData.expenseDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}

export default AddIncomeAndExpenseForm;

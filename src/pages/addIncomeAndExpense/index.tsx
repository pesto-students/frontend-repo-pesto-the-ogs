import AddIncomeAndExpenseForm from "../../components/incomeAndExpense/AddIncomeAndExpenseForm";
import { IObject } from "../../types/common";

function AddIncomeAndExpense() {
  const onSubmit = (data: IObject) => {
    console.log(data);
  };

  return (
    <div className="py-40">
      <AddIncomeAndExpenseForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddIncomeAndExpense;

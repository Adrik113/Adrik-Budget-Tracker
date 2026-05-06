import React, { useCallback, useState } from "react";
import Header from "./Components/Header";
import AddExpenseButton from "./Components/AddExpenseButton";
import ClearExpensesButton from "./Components/ClearExpensesButton";
import ToggleChartButton from "./Components/ToggleChartButton";
import ExpenseInputField from "./Components/ExpenseInputField";
import IncomeInputField from "./Components/IncomeInputField";
import ClearIncomeButton from "./Components/ClearIncomeButton";
import CustomPiechart from "./Components/PieChart";
import BarChart from "./Components/BarChart";
import BudgetSettings from "./Components/BudgetSettings";
import CategoryProgress from "./Components/CategoryProgress";
import "./App.css";

function App() {
  // ===== STATE =====
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [showPieChart, setShowPieChart] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // ===== CATEGORIES =====
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Rent",
  ];

  // ===== ADD EXPENSE (FIXED) =====
  const handleAddExpense = () => {
    if (!expenseAmount || !selectedCategory) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(expenseAmount),
      category: selectedCategory,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setExpenseAmount("");
  };

  // ===== CLEAR FUNCTIONS =====
  const handleClearIncome = () => setIncome(0);

  const handleClearExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  // ===== TOGGLE CHART =====
  const handleToggleChart = useCallback(() => {
    setShowPieChart((prev) => !prev);
  }, []);

  // ===== TOTALS =====
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const remainingBudget = income - totalExpenses;

  return (
    <div className="App">
      <Header />

      {/* Income */}
      <IncomeInputField
        value={income}
        onChange={(e) =>
          setIncome(
            e.target.value ? parseFloat(e.target.value) : 0
          )
        }
      />

      {/* Expense Input */}
      <ExpenseInputField
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Buttons */}
      <AddExpenseButton onClick={handleAddExpense} />
      <ClearIncomeButton onClick={handleClearIncome} />
      <ClearExpensesButton onClick={handleClearExpenses} />
      <ToggleChartButton onClick={handleToggleChart} />

      {/* Budget System */}
      <BudgetSettings
        categories={categories}
        budgets={budgets}
        setBudgets={setBudgets}
      />

      <CategoryProgress
        categories={categories}
        budgets={budgets}
        expenses={expenses}
      />

      {/* Summary */}
      <div>
        Expenses:{" "}
        {expenses.length > 0
          ? expenses
              .map((e) => `${e.category}: $${e.amount}`)
              .join(", ")
          : "No expenses recorded"}
      </div>

      <div>Income: ${income.toFixed(2)}</div>
      <div>Total Expenses: ${totalExpenses.toFixed(2)}</div>
      <div>Remaining Budget: ${remainingBudget.toFixed(2)}</div>

      {/* Charts */}
      {showPieChart ? (
        <CustomPiechart expenses={expenses} />
      ) : (
        <BarChart income={income} expenses={totalExpenses} />
      )}
    </div>
  );
}

export default App;
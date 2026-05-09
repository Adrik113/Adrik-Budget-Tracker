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

      {/*Dashboard cards */}
      <div className="dashboard-cards">

        <div className="card">
          <h3>Income</h3>
          <p>${income.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Remaining Budget</h3>
          <p>${remainingBudget.toFixed(2)}</p>
        </div>

      </div>

      {/*Transaction Area */}
      <div className="card">

        <h2>Add Expense</h2>

        <IncomeInputField 
        value={income} 
        onChange={(e) => 
          setIncome(
            e.target.value ? parseFloat(e.target.value)
            : 0
          )
        }
        />

        <ExpenseInputField
          value={expenseAmount}
          onChange={(e) =>
            setExpenseAmount(e.target.value)
          }
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="button-row">
          <AddExpenseButton onClick={handleAddExpense} />
          <ClearIncomeButton onClick={handleClearIncome} />
          <ClearExpensesButton onClick={handleClearExpenses} />
          <ToggleChartButton onClick={handleToggleChart} />
        </div>
  
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">

        <div className="card">
          <BudgetSettings
            categories={categories}
              budgets={budgets}
              setBudgets={setBudgets}
              />

              <CategoryProgress
                categories={categories}
                expenses={expenses}
                budgets={budgets}
              />
        </div>

        <div className="card">
          {showPieChart ? (
            <CustomPiechart expenses ={expenses} />
          ) : (
            <BarChart  income={income}expenses={expenses} 
            />
          )}
        </div>

       </div>

     </div>

        );
   
}
export default App;
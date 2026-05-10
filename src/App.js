import React, { useState, useCallback, useEffect } from "react";
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
import IncomeExpenseChart from "./Components/IncomeExpenseChart";
import { useSettings } from "./context/settingsContext";
import "./App.css";

function App() {
  // ===== STATE =====
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [showPieChart, setShowPieChart] = useState(true);
  const [budgets, setBudgets] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const { theme, setTheme, fontSize, setFontSize } = useSettings();

  // ===== CATEGORIES =====
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Rent",
  ];
    
    useEffect(() => {
      const savedExpenses = 
      JSON.parse(
        localStorage.getItem("expenses")
      ) || [];

      const savedIncome = 
      JSON.parse(
        localStorage.getItem("income")
      ) || 0;

      const savedBudgets = 
      JSON.parse(
        localStorage.getItem("budgets")
       ) || {};

      setExpenses(savedExpenses);
      setIncome(savedIncome);
      setBudgets(savedBudgets);
    }, []);
      
    useEffect(() => {

      localStorage.setItem("expenses", JSON.stringify(expenses));
      localStorage.setItem("income", JSON.stringify(income));
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }, [expenses, income, budgets]);
    

  

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

  const overBudgetAlerts = categories
  .map((category) => {
    const spent = expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);

    const budget = budgets[category] || 0;

    if (budget > 0 && spent > budget) {
      return {
        category, 
        overBy: spent - budget,
      };
    }

    return null;
  })
  .filter(Boolean);
   

  return (
    <div className={`App ${theme} ${fontSize}`}>

      <Header onToggleSettings={() => setShowSettings(!showSettings)} />

        {showSettings && (
          <div className="settings-panel">
            <h2>Settings</h2>

            <h3>Theme</h3>

            <button onClick={() => setTheme("light")}>
              Light Mode 
            </button>

            <button onClick={() => setTheme("dark")}>
              Dark Mode
            </button>

            {/* Font Size */}
            <h3>Font Size</h3>

            <button onClick={() => setFontSize("small")}>
              Small
            </button>

            <button onClick={() => setFontSize("medium")}>
              Medium
            </button>

            <button onClick={() => setFontSize("large")}>
              Large
            </button>

           
          </div>
        )}

      {/*Dashboard cards */}
      <div className="dashboard-grid">

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

       {overBudgetAlerts.length > 0 && (
            <div className="alert-container">

              {overBudgetAlerts.map((alert) => (
                <div
                  key={alert.category}
                  className="alert-card"
                  >
                  ⚠ Over budget in {alert.category} by $
                  {alert.overBy.toFixed(2)}
                </div>
              ))}
            </div>
          )}

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

      {/* Transaction History */}
<div className="card">

  <h2>Transaction History</h2>

  {expenses.length === 0 ? (
    <p>No transactions yet.</p>
  ) : (
    <div className="transaction-list">

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="transaction-item"
        >

          <strong>
            {expense.category}
          </strong>

          <span>
            ${expense.amount.toFixed(2)}
          </span>

          <button
            onClick={() =>
              setExpenses((prevExpenses) =>
                prevExpenses.filter(
                  (e) => e.id !== expense.id
                )
              )
            }
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  )}

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

          <h2>Overview</h2>
          <IncomeExpenseChart
            income={income}
            expenses={totalExpenses}
          />

         

          {showPieChart ? (
            <CustomPiechart income={income}expenses ={expenses} />
          ) : (
            <BarChart  income={income} expenses={expenses} 
            />
          )}
        </div>

       </div>

     </div>

        );
   
}
export default App;
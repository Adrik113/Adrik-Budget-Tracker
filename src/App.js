
import React, { useCallback, useState } from 'react';
import Header from "./Components/Header";
import AddExpenseButton from './Components/AddExpenseButton';
import ClearExpensesButton from './Components/ClearExpensesButton';
import ToggleChartButton from './Components/ToggleChartButton';
import ExpenseInputField from './Components/ExpenseInputField';
import IncomeInputField from './Components/IncomeInputField';
import ClearIncomeButton from './Components/ClearIncomeButton';
import PieChart from './Components/PieChart';
import BarChart from './Components/BarChart';
import './App.css';

function App() {

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [showPieChart, setShowPieChart] = useState(true);
  

  
  //Function to handle adding expenses 
  const handleAddExpense = useCallback(() => {
    const value = parseFloat(expenseAmount);
    if(!isNaN(value) && value > 0) {
      setExpenses((prevExpenses) => [...prevExpenses, value]);
      setExpenseAmount("");
    }
  }, [expenseAmount]);

  //function to handle clearing income 
  const handleClearIncome = () => {
    setIncome("");
  } ;


  const handleClearExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  const handleToggleChart = useCallback(() => {
    setShowPieChart((prev) => !prev);
  }, []);

  const totalExpenses = expenses.reduce((acc, current) => acc + current, 0);

  const remainingBudget = income - totalExpenses;
  return (
    <div className="App">
      <Header />
      <IncomeInputField  value={income} onChange={(e) => setIncome(e.target.value ? parseFloat(e.target.value) : 0)} />
      <ExpenseInputField value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
      <AddExpenseButton onClick={handleAddExpense} />
      <ClearIncomeButton onClick={handleClearIncome} />
      <ClearExpensesButton onClick={handleClearExpenses}/>
      <ToggleChartButton onClick={handleToggleChart}/>
      <div>Expenses: {expenses.length > 0 ? expenses.join(", ") : "No expenses recorded"}</div>

      <div>Income: ${Number(income || 0).toFixed(2)}</div>
      <div>Total Expenses: ${totalExpenses.toFixed(2)}</div>
      <div>Remaining Budget: ${remainingBudget.toFixed(2)}</div>
      {showPieChart ? (<PieChart income={income} expenses={totalExpenses}/>
      ) : 
      (<BarChart income={income} expenses={totalExpenses}/>)}
    </div>
  );
}

export default App;

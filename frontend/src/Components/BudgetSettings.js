import React, { useState } from "react";

function BudgetSettings({
  categories,
  budgets,
  setBudgets
}) {

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [budgetAmount, setBudgetAmount] =
    useState("");

  const handleSave = () => {

    if (
      !selectedCategory ||
      !budgetAmount
    ) {
      return;
    }

    setBudgets({
      ...budgets,

      [selectedCategory]:
        parseFloat(budgetAmount),
    });

    setBudgetAmount("");
  };

  return (
    <div>

      <h2>Budget Limits</h2>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>


      <input
        type="number"
        placeholder="Budget amount"
        value={budgetAmount}
        onChange={(e) =>
          setBudgetAmount(
            e.target.value
          )
        }
      />


      <button onClick={handleSave}>
        Save Budget
      </button>

    </div>
  );
}

export default BudgetSettings;
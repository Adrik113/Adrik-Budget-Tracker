import React, { useState } from "react";

const BudgetSettings = ({ categories, budgets, setBudgets }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");

  const handleSave = () => {
    if (!selectedCategory || !limit) return;

    const updated = [...budgets];

    const existingIndex = updated.findIndex(
      (b) => b.category === selectedCategory
    );

    if (existingIndex !== -1) {
      // update existing
      updated[existingIndex].limit = Number(limit);
    } else {
      // add new
      updated.push({
        category: selectedCategory,
        limit: Number(limit),
      });
    }

    setBudgets(updated);

    setSelectedCategory("");
    setLimit("");
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}>
      <h2>Set Budget Limits</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Enter limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button onClick={handleSave} style={{ marginLeft: "10px" }}>
        Save
      </button>
    </div>
  );
};

export default BudgetSettings;
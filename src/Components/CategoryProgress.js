import React from "react";

function CategoryProgress({ categories, budgets, expenses }) {
  // calculate spent per category
  const getSpent = (category) =>
    expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);

  // get budget limit
  const getBudget = (category) => {
    const found = budgets.find((b) => b.category === category);
    return found ? found.limit : 0;
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Budget Progress</h2>

      {categories.map((cat) => {
        const spent = getSpent(cat);
        const budget = getBudget(cat);

        const percent = budget > 0 ? (spent / budget) * 100 : 0;

        let barColor = "green";
        if (percent >= 100) barColor = "red";
        else if (percent >= 80) barColor = "orange";

        return (
          <div key={cat} style={{ marginBottom: "15px" }}>
            <strong>{cat}</strong>

            <div
              style={{
                height: "10px",
                width: "100%",
                background: "#ddd",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: `${Math.min(percent, 100)}%`,
                  background: barColor,
                  borderRadius: "5px",
                }}
              />
            </div>

            <small>
              ${spent} / ${budget} ({percent.toFixed(0)}%)
            </small>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryProgress;
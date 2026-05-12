import React from "react";

function CategoryProgress({
  categories,
  expenses,
  budgets
}) {

  const getSpent = (category) => {
    return expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getBudget = (category) => {
    return budgets[category] || 0;
  };

  return (
    <div>

      <h2>Budget Progress</h2>

      {categories.map((category) => {

        const spent = getSpent(category);
        const budget = getBudget(category);

        const percent =
          budget > 0
            ? Math.min((spent / budget) * 100, 100)
            : 0;

        return (
          <div
            key={category}
            style={{ marginBottom: "15px" }}
          >

            <div>
              {category}: $
              {spent.toFixed(2)} / $
              {budget.toFixed(2)}
            </div>

            <div
              style={{
                width: "100%",
                background: "#444",
                borderRadius: "8px",
                height: "20px",
              }}
            >

              <div
                style={{
                  width: `${percent}%`,
                  background:
                    spent > budget
                      ? "#ff4d4d"
                      : "#00C49F",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />

            </div>

          </div>
        );
      })}

    </div>
  );
}


export default CategoryProgress;
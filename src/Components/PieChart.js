import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CustomPiechart = ({
  expenses = [],
  colors = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28", "#AA336A"],
  chartSize = 400,
}) => {
  // Group expenses by category
  const categoryTotals = {};

  expenses.forEach((e) => {
    if (!categoryTotals[e.category]) {
      categoryTotals[e.category] = 0;
    }
    categoryTotals[e.category] += e.amount;
  });

  const data = Object.keys(categoryTotals).map((key) => ({
    name: key,
    value: categoryTotals[key],
  }));

  // If no data, show fallback
  if (data.length === 0) {
    return <p style={{ color: "white" }}>No expenses to display</p>;
  }

  return (
    <PieChart width={chartSize} height={chartSize}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={chartSize / 2.8}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % colors.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPiechart;
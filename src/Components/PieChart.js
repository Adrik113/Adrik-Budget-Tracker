import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CustomPiechart = ({
  expenses = [],
  colors = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28", "#AA336A"],
  chartSize = 400,
}) => {
  // Group expenses by category
  const categoryMap = {};

  expenses.forEach((e) => {
    if (!categoryMap[e.category]) {
      categoryMap[e.category] = 0;
    }
    categoryMap[e.category] += e.amount;
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

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
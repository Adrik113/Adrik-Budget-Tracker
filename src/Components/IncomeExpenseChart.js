import React from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

const IncomeExpenseChart = ({ income = 0, expenses = 0}) => {
    const data = [
        { name: "Income", value: income },
        { name: "Expenses", value: expenses }
    ];

    const colors = ["#00c49f", "#ff8042"];

    return ( <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>

        <Tooltip />
        <Legend />
    </PieChart> 
    );
    
};

export default IncomeExpenseChart
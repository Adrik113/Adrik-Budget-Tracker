import React from 'react';
import {PieChart, Pie, Cell, Tooltip , Legend} from 'recharts';

const CustomPiechart = ({income = 0, expenses = 0, colors = ['#FF8042', '#00C49F'], chartSize = 400}) =>  {
    //calcualte the remaining budget (income - expenses)
    const remainingBudget = Math.max(income - expenses, 0);

    const data = [
        { name: 'Expenses', value: expenses},
        {name: 'Remaining', value: remainingBudget}
    ];

    //define colors for the pie chart

    return (
        <PieChart width={chartSize} height={chartSize}>
            <Pie
            data={data} 
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={chartSize / 2.8}
            fill={colors[0]}>
                {data.map((entry, index)=> (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    )
};

CustomPiechart.defaultProps = {
    income: 0,
    expenses: 0,
    colors: ['#FF8042', '#00C49F'],
    chartSize: 400
};
export default CustomPiechart;
import React from 'react';
import {BarChart, Bar , XAxis, YAxis, CartesianGrid, Tooltip, Legend , ResponsiveContainer} from 'recharts';
const CustomBarChart = ({income = 0 , expenses = 0, chartHeight = 300, barColor = "#8884d8"}) => {
    //Data display in the bar chart 
    const data = [
        {name: 'Income', value: income},
        {name: 'Expenses', value: expenses},
    ];


    return ( 
        <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data} aria-label = "Income vs Expenses Bar Chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={barColor} />
                </BarChart> 
            </ResponsiveContainer>
    );
};


export default CustomBarChart;
import React from 'react';

const ExpenseInputField = ({value, onChange}) => ( <input type="text" placeholder='Enter expense amount' value={value} onChange={onChange} />);

export default ExpenseInputField;
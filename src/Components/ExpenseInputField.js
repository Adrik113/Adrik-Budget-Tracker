import React from 'react';

function ExpenseInputField({
    value,
    onChange,
    categories,
    selectedCategory,
    setSelectedCategory
}) {
    return (
        <div style={{ marginBottom: "10px"}}>

            {/* Amount Input */}
            <input 
                type="number"
                placeholder="Enter expense amount"
                value={value}
                onChange={onChange}
            />
            {/* Category Dropdown */}
            <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ marginLeft: "10px"}}
                >
                    <option value="">Select Category</option>

                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
        </div>
    );
}

export default ExpenseInputField;
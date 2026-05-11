const express  = require("express");

const router = express.Router();

const Expense = require("../models/Expense");

// Get All expenses (from DB)
router.get("/", async (req, res) => {
    try {
        const expenses = 
        await Expense.find();

        res.json(expenses);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// POST new expense (Save to DB)
router.post("/", async (req, res) => {
    try {
        const newExpense = 
        new Expense({
            amount: req.body.amount,
            category: req.body.category
        });

        const saved = 
        await newExpense.save();

        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// DELETE expense ( from DB )
router.delete("/:id", async (req, res) => {
    try {

        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
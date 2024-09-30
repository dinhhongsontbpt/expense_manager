const Expense = require('../models/Expense');

// Lấy tất cả chi tiêu
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm chi tiêu mới
const addExpense = async (req, res) => {
    const { category, amount, description, date, payment_method, tags } = req.body;

    const expense = new Expense({
        category,
        amount,
        description,
        date,
        payment_method,
        tags,
    });

    try {
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa chi tiêu theo ID
const deleteExpense = async (req, res) => {
    try {
        const removedExpense = await Expense.findByIdAndRemove(req.params.id);
        if (!removedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(removedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getExpenses,
    addExpense,
    deleteExpense,
};

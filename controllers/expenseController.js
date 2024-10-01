const Expense = require('../models/Expense');

// Lấy tất cả chi tiêu
const getExpenses = async (req, res) => {
    try {
        // Sắp xếp theo ngày giảm dần (newest to oldest)
        const expenses = await Expense.find().sort({ date: -1 }); // Sắp xếp theo trường date
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Thêm chi tiêu mới
const addExpense = async (req, res) => {
    const { category, amount, description, date, payment_method, type } = req.body;

    // Lấy giờ hiện tại
    const currentDate = new Date(date);
    const currentTime = new Date(); // Thời gian hiện tại
    currentDate.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()); // Kết hợp giờ, phút, giây từ hiện tại

    const expense = new Expense({
        category,
        amount,
        description,
        date: currentDate,
        payment_method,
        type, // Lưu type vào cơ sở dữ liệu
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
        const removedExpense = await Expense.findByIdAndDelete(req.params.id); // Sử dụng findByIdAndDelete
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

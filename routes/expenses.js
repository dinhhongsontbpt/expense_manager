const express = require('express');
const {
    getExpenses,
    addExpense,
    deleteExpense
} = require('../controllers/expenseController');

const router = express.Router();

// Route để lấy tất cả chi tiêu
router.get('/', getExpenses);

// Route để thêm chi tiêu mới
router.post('/', addExpense);

// Route để xóa chi tiêu theo ID
router.delete('/:id', deleteExpense);

module.exports = router;

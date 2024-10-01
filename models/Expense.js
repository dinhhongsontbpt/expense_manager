const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // Mảng chứa các thẻ
        default: [],
    },
    type: { // Thêm thuộc tính type
        type: String,
        enum: ['income', 'expense'], // Chỉ cho phép hai giá trị
        required: true,
    }
}, {
    timestamps: true, // Tự động thêm các trường createdAt và updatedAt
});

module.exports = mongoose.model('Expense', ExpenseSchema);

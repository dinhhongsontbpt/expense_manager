const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenses');
const Expense = require('./models/Expense');

dotenv.config(); // Load biến môi trường từ .env

const app = express();

// Kết nối MongoDB
connectDB();

// Cấu hình EJS
app.set('view engine', 'ejs');
app.use(express.static('public')); // Tạo đường dẫn tĩnh đến thư mục public nếu có

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Để phân tích dữ liệu từ form

// Route chính cho trang index
app.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find(); // Lấy tất cả chi tiêu từ MongoDB
        res.render('index', { expenses }); // Render trang index.ejs với danh sách chi tiêu
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Các route cho quản lý chi tiêu (API)
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

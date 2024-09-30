//db.js
const mongoose = require('mongoose'); // Import mongoose

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Kết nối tới MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Connected to Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Thoát khi lỗi kết nối
    }
};

module.exports = connectDB; // Xuất hàm connectDB

import db from '../config/database.js';
import bcrypt from 'bcrypt';

// Lấy tất cả người dùng
export const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
};

// Thêm người dùng mới (bao gồm mã hóa mật khẩu)
export const addUser = async (userData, callback) => {
    try {
        // Mã hóa mật khẩu
        // console.log(userData)
        const salt = await bcrypt.genSalt(10); // Tạo salt với độ dài 10
        const hashedPassword = await bcrypt.hash(userData.password, salt); // Mã hóa mật khẩu

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [userData.username, userData.email, hashedPassword], callback);
    } catch (error) {
        console.error('Error hashing password:', error);
        callback(error, null);
    }
};

// Lấy người dùng theo ID
export const getUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], callback);
};

export const getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
};
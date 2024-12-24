import db from '../config/database.js';
// import bcrypt from 'bcrypt';

// Lấy tất cả người dùng
export const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
};

// Thêm người dùng mới (bao gồm mã hóa mật khẩu)
export const addUser = (userData, callback) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [userData.username, userData.email, userData.password], callback);
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

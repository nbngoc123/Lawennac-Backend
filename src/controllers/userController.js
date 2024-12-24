import { getAllUsers, addUser } from '../models/user.js';
// Lấy danh sách người dùng
export const getUsers = (req, res) => {
    getAllUsers((err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Thêm người dùng mới
export const addUserCtrl = (req, res) => {
    const userData = req.body;
    addUser(userData, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User added successfully', userId: result.insertId });
    });
};


import { getUserByUsername } from '../models/user.js';

// Lấy người dùng theo username
export const getUser = (req, res) => {
    const { username } = req.params;

    getUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    });
};


export const loginUser = (req, res) => {
    const { username, password } = req.body;
  
    getUserByUsername(username, (err, results) => {
      if (err) return res.status(500).send('Lỗi hệ thống.');
  
      if (results.length === 0) {
        return res.status(400).send('Tên người dùng không tồn tại.');
      }
  
      const user = results[0];
  
      if (password === user.password) {
          res.json({ message: 'Đăng nhập thành công', userId: user.id, username: user.username });
      } else {
          return res.status(400).send('Mật khẩu không đúng.');
      }
    });
  };

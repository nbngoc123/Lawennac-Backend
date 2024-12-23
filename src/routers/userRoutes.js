import express from 'express';
const router = express.Router();
import { getUsers, addUserCtrl, getUser, loginUser } from '../controllers/userController.js';
// Định nghĩa các endpoint
router.get('/', getUsers);
router.post('/add', addUserCtrl);
router.get('/:username', getUser);
router.post('/auth/login', loginUser);

export default router;

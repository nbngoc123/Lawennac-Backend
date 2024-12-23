import express from 'express';
const router = express.Router();
import { getAllRequests, addRequest, addImageRequestWithLora  } from '../controllers/imageRequestController.js';
import { addImageRequestWithRunwareData } from '../controllers/imageRequestController.js';

// Định nghĩa các endpoint
router.get('/:user_id', getAllRequests);
router.post('/add', addRequest);
router.post('/with-lora', addImageRequestWithLora);



// Route tạo ảnh và lưu kết quả
router.post('/generate', addImageRequestWithRunwareData);


export default router;

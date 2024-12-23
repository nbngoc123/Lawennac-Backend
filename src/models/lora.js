import db from '../config/database.js';
// Thêm cấu hình LoRA
export const addLoraDetails = (loraDetails, callback) => {
    const query = 'INSERT INTO lora_details (image_request_id, model, weight) VALUES (?, ?, ?)';
    db.query(query, [loraDetails.image_request_id, loraDetails.model, loraDetails.weight], callback);
};
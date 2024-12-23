import db from '../config/database.js';
// Lấy tất cả yêu cầu tạo ảnh
export const getAllImageRequests = (userId, callback) => {
    const query = 'SELECT * FROM image_requests WHERE user_id = ?';
    db.query(query, [userId], callback);
};

// Thêm yêu cầu tạo ảnh mới
export const addImageRequest = (imageRequestData, callback) => {
    const query = `
        INSERT INTO image_requests (user_id, task_uuid, image_uuid, positive_prompt, negative_prompt, model, width, height, steps, guidance_scale, scheduler, clip_skip, seed, image_url, nsfw_content, control_net) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [
        imageRequestData.user_id,
        imageRequestData.taskUUID,
        imageRequestData.imageUUID,
        imageRequestData.positivePrompt,
        imageRequestData.negativePrompt,
        imageRequestData.model,
        imageRequestData.width,
        imageRequestData.height,
        imageRequestData.steps,
        imageRequestData.guidanceScale,
        imageRequestData.scheduler,
        imageRequestData.clipSkip,
        imageRequestData.seed,
        imageRequestData.imageURL,
        imageRequestData.nsfwContent,
        JSON.stringify(imageRequestData.control_net)
    ], callback);
};




// // Trong model imageRequest.js
// export const addImageRequest = (imageRequestData, callback) => {
//     const query = `
//         INSERT INTO image_requests (
//             user_id,
//             task_uuid,
//             image_uuid,
//             nsfw_content,
//             seed,
//             image_url,
//             positive_prompt,
//             negative_prompt
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.query(query, [
//         imageRequestData.user_id,  // Lưu user_id vào cơ sở dữ liệu
//         imageRequestData.taskUUID,
//         imageRequestData.imageUUID,
//         imageRequestData.nsfwContent,
//         imageRequestData.seed,
//         imageRequestData.imageURL,
//         imageRequestData.positivePrompt,
//         imageRequestData.negativePrompt
//     ], callback);
// };

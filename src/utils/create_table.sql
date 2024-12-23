-- Tạo cơ sở dữ liệu
CREATE DATABASE ai_image_generation;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE ai_image_generation;

-- Bảng users: Quản lý thông tin người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Lưu mật khẩu đã mã hóa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng image_requests: Lưu thông tin các yêu cầu tạo ảnh
CREATE TABLE image_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Liên kết với bảng users
    task_uuid VARCHAR(100) NOT NULL,
    image_uuid VARCHAR(100) NOT NULL,
    positive_prompt TEXT NOT NULL,
    negative_prompt TEXT DEFAULT NULL,
    model VARCHAR(50) NOT NULL,
    width INT DEFAULT 512,
    height INT DEFAULT 512,
    steps INT DEFAULT NULL,
    guidance_scale FLOAT DEFAULT NULL,
    scheduler VARCHAR(50) DEFAULT NULL,
    clip_skip INT DEFAULT NULL,
    control_net JSON DEFAULT NULL, -- Lưu cấu hình ControlNet dưới dạng JSON
    seed BIGINT DEFAULT NULL,
    image_url TEXT NOT NULL,
    nsfw_content BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng lora_details: Lưu thông tin chi tiết LoRA (nếu cần tách riêng)
CREATE TABLE lora_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_request_id INT NOT NULL, -- Liên kết với bảng image_requests
    model VARCHAR(100) NOT NULL, -- Tên model của LoRA
    weight FLOAT DEFAULT 0.5, -- Trọng số của LoRA
    FOREIGN KEY (image_request_id) REFERENCES image_requests(id) ON DELETE CASCADE
);

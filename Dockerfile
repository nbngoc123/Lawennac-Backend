# 1. Chọn base image (ví dụ Node.js 16)
# FROM node:16
FROM node:21

# 2. Tạo thư mục làm việc trong container
WORKDIR /usr/app

# 3. Copy package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# 4. Xóa node_modules và cài đặt lại dependencies
RUN npm install

# 5. Copy toàn bộ code vào container
COPY . .

# 6. Expose cổng ứng dụng (nếu cần)
EXPOSE 3000

# 7. Lệnh chạy ứng dụng
CMD [ "node", "src/app.js" ]

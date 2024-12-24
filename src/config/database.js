import mysql from 'mysql2';
import dotenv from 'dotenv';

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'thanhno1303',
//   database: 'ai_image_generation',
// });
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//   } else {
//     console.log('Connected to the database');
//   }
// });

// export default db;


dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
});



export default pool;









































// import mysql from 'mysql2/promise'; // Import mysql2/promise

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   connectionLimit: process.env.DB_CONNECTION_LIMIT,
// });

// async function connectToDatabase() {
//   try {
//     const connection = await pool.getConnection();
//     console.log("Connected to database!");

//     // Thực hiện các truy vấn database ở đây
//     // Ví dụ:
//     // const [rows] = await connection.execute('SELECT 1+1 AS solution');
//     // console.log(rows);

//     connection.release(); // Giải phóng kết nối *luôn luôn* trong khối finally hoặc sau khi sử dụng xong
//     return true; // Trả về true nếu kết nối thành công
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     return false; // Trả về false nếu kết nối thất bại
//   }
// }

// async function startServer() {
//     const isConnected = await connectToDatabase();
//     if (!isConnected) {
//         console.error("Database connection failed. Exiting...");
//         process.exit(1); // Thoát ứng dụng nếu không kết nối được database
//     }
// }

// startServer();

// export default pool;
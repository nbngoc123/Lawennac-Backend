import express from 'express';
import bodyParser from 'body-parser';
const app = express();
// import { generateImage } from './services/RequestImage.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000', // Chỉ cho phép origin này
  methods: ['GET', 'POST'], // Chỉ cho phép các method này
  allowedHeaders: ['Content-Type', 'Authorization'], // Cho phép các header
}));

app.use(express.json()); // Middleware xử lý JSON

import userRoutes from './routers/userRoutes.js';
import imageRequestRoutes from './routers/imageRequestRoutes.js';



app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/api/image-requests', imageRequestRoutes);
async function main() {
  try {
  const images = await generateImage(
    "a cyberpunk cityscape", 
    "low quality", 
    "civitai:12606@100675",
    512, 
    512, 
  );

  console.log(images);
} catch (error) {
  console.error("Failed to generate images:", error.message || error);
}
}
// main();
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});

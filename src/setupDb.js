const db = require('./db');

const createTables = () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS image_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
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
      control_net JSON DEFAULT NULL,
      seed BIGINT DEFAULT NULL,
      image_url TEXT NOT NULL,
      nsfw_content BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS lora_details (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image_request_id INT NOT NULL,
      model VARCHAR(100) NOT NULL,
      weight FLOAT DEFAULT 0.5,
      FOREIGN KEY (image_request_id) REFERENCES image_requests(id) ON DELETE CASCADE
    )`,
  ];

  queries.forEach((query) => {
    db.query(query, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created successfully!');
      }
    });
  });

  db.end();
};

createTables();

import { getAllImageRequests, addImageRequest } from '../models/imageRequest.js';
import { addLoraDetails } from '../models/lora.js'; // Đảm bảo bạn đã tạo hàm import đúng
import {generateImage} from '../services/RequestImage.js'
// Lấy danh sách yêu cầu tạo ảnh
export const getAllRequests = (req, res) => {
    // console.log(req.query)
    const userId = req.params.user_id;
    if (!userId) return res.status(400).json({ message: "User ID is required" });
    getAllImageRequests(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};
// Thêm yêu cầu tạo ảnh
export const addRequest = (req, res) => {
    const requestData = req.body;
    addImageRequest(requestData, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Image request added successfully', requestId: result.insertId });
    });
};

// Thêm yêu cầu tạo ảnh và cấu hình LoRA
export const addImageRequestWithLora = (req, res) => {
    const { imageRequestData, lora } = req.body;

    // Lưu yêu cầu tạo ảnh
    addImageRequest(imageRequestData, (err, result) => {
        if (err) return res.status(500).send(err);

        const imageRequestId = result.insertId;

        // Lưu thông tin LoRA
        lora.forEach(lora => {
            addLoraDetails({ image_request_id: imageRequestId, model: lora.model, weight: lora.weight }, (err) => {
                if (err) return res.status(500).send(err);
            });
        });

        res.json({ message: 'Image request and LoRA details added successfully', requestId: imageRequestId });
    });
};



export const addImageRequestWithRunwareData = (req, res) => {
    const {
      user_id,
      positivePrompt,
      negativePrompt,
      model,
      width,
      height,
      numberResults,
      steps,
      guidanceScale,
      scheduler,
      clipSkip,
      controlNet,
      lora,
      seed,
      seedImage,
    } = req.body;
    // Kiểm tra nếu không có user_id, trả về lỗi
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    // Gọi hàm generateImage để tạo ảnh
    generateImage(
      positivePrompt,
      negativePrompt,
      model,
      width,
      height,
      numberResults,
      steps,
      guidanceScale,
      scheduler,
      clipSkip,
      controlNet,
      lora,
      seed,
      seedImage
    )
      .then((imageResults) => {
        // Lặp qua tất cả các ảnh trả về
        imageResults.forEach((imageData, index) => {
          const imageRequestData = {
            user_id,
            model,
            width,
            height,
            numberResults,
            steps,
            guidanceScale,
            scheduler,
            clipSkip,
            controlNet,
            seed,
            taskUUID: imageData.taskUUID,
            imageUUID: imageData.imageUUID,
            nsfwContent: imageData.NSFWContent,
            seed: imageData.seed,
            imageURL: imageData.imageURL,
            positivePrompt: imageData.positivePrompt, // Assuming you store prompts for each image
            negativePrompt: imageData.negativePrompt, // Assuming you store prompts for each image
            imageIndex: index, // Thêm trường để phân biệt các ảnh trong cùng một request
          };
  
          console.log(imageRequestData);
          // Lưu thông tin vào cơ sở dữ liệu
          addImageRequest(imageRequestData, (err, result) => {
            if (err) {
              console.error("Error saving image request:", err);
              // Không return res.status(500) ở đây để tiếp tục lưu các ảnh khác
              // Có thể log lỗi vào một bảng error_logs riêng để theo dõi
            } else {
              if (lora && lora.length > 0) {
                lora.forEach((loraItem) => {
                  addLoraDetails(
                    {
                      image_request_id: result.insertId,
                      model: loraItem.model,
                      weight: loraItem.weight,
                    },
                    (err) => {
                      if (err) {
                        console.error("Error saving LoRA details:", err);
                        // Tương tự, không return res.status(500) ở đây
                      }
                    }
                  );
                });
              }
              console.log(`Image request and results saved successfully. Request ID: ${result.insertId}, Image Index: ${index}`);
            }
          });
        });
        
        res.status(200).json({
          message: 'Multiple image requests and results saved successfully',
          // Có thể trả về thông tin taskUUID chung nếu cần
          // taskUUID: imageResults[0].taskUUID
        });
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        res
          .status(500)
          .json({ message: "Error generating image", error: error.message });
      });
  };
const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoController = require('../controllers/videoController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/videos';
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// POST route for uploading a video
router.post('/upload-video', upload.single('video'), videoController.uploadVideo);

// GET route to fetch all videos
router.get('/videos', videoController.getAllVideos);
router.delete('/video/:id', videoController.deleteVideo);
module.exports = router;

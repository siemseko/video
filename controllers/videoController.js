const fs = require('fs');
const path = require('path');
const videoModel = require('../models/videoModel');

const uploadVideo = (req, res) => {
    const { title, description } = req.body;
    const videoPath = req.file.path; // Path to the uploaded video file

    if (!title || !description || !req.file) {
        return res.status(400).send('Title, description, and video file are required');
    }

    videoModel.addVideo(title, description, videoPath, (err, videoId) => {
        if (err) {
            return res.status(500).send('Failed to save the video to the database');
        }

        res.status(200).send(`Video added with ID ${videoId}`);
    });
};

const getAllVideos = (req, res) => {
    videoModel.getAllVideos((err, videos) => {
        if (err) {
            return res.status(500).send('Failed to retrieve videos from the database');
        }

        res.status(200).json({
            data: videos
        });
    });
};
const deleteVideo = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Video ID is required');
    }

    // First, retrieve the video file path from the database
    videoModel.getVideoById(id, (err, video) => {
        if (err || !video) {
            return res.status(404).send('Video not found');
        }

        const videoPath = video.video_path;

        // Delete the video metadata from the database
        videoModel.deleteVideoById(id, (err, changes) => {
            if (err) {
                return res.status(500).send('Failed to delete video from the database');
            }

            if (changes === 0) {
                return res.status(404).send('Video not found');
            }

            // Delete the video file from the filesystem
            fs.unlink(videoPath, (err) => {
                if (err) {
                    return res.status(500).send('Failed to delete video file');
                }

                res.status(200).send('Video deleted successfully');
            });
        });
    });
};


module.exports = {
    uploadVideo,
    getAllVideos,
    deleteVideo
};

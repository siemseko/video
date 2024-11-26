const db = require('./db');

// Create the videos table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    video_path TEXT NOT NULL
  )
`);

const addVideo = (title, description, videoPath, callback) => {
    const insertQuery = `INSERT INTO videos (title, description, video_path) VALUES (?, ?, ?)`;
    db.run(insertQuery, [title, description, videoPath], function (err) {
        callback(err, this?.lastID);
    });
};

const getAllVideos = (callback) => {
    const selectQuery = `SELECT * FROM videos`;
    db.all(selectQuery, [], (err, rows) => {
        callback(err, rows);
    });
};
const deleteVideoById = (id, callback) => {
    const deleteQuery = `DELETE FROM videos WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
        callback(err, this.changes); // `this.changes` will be 1 if a row was deleted
    });
};
const getVideoById = (id, callback) => {
    const selectQuery = `SELECT * FROM videos WHERE id = ?`;
    db.get(selectQuery, [id], (err, row) => {
        callback(err, row);
    });
};

module.exports = {
    addVideo,
    getAllVideos,
    deleteVideoById,
    getVideoById

};

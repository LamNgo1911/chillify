
const multer = require('multer');
const mongoose = require('mongoose');
const {GridFsStorage} = require('multer-gridfs-storage');

// Connection URL
const url = process.env.MONGO_URI;
const conn  = mongoose.createConnection(url);

let bucket;
conn.once('open', () => {
    // init stream
    console.log('Connection to MongoDB is open');
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 8196,
        bucketName: 'songs'
  });
});

// create storage engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'songs'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });


exports.upload = upload;
exports.conn = conn;

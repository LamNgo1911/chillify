const asyncHandler = require('../middleware/async');
const Song = require('../models/song');
const ErrorResponse = require('../utils/errorResponse');
const {conn} = require('../middleware/uploads');
const mongoose = require('mongoose');

// streamSongUrl
const streamSongUrl = asyncHandler(async (req, res, next) => {
    const filename = req.params.filename;
    
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        chunkSizeBytes: 1024,
        bucketName: 'songs'
    });
    
    const downloadStream = bucket.openDownloadStreamByName(filename);
  
    // set accept encoding header
    res.set('Accept-Ranges', 'bytes');
    res.set('Content-Type', 'audio/mpeg');
    
    // Get the total length of the file
    const fileInfo = await bucket.find({ filename }).toArray();
    if (fileInfo.length === 0) {
        return next(new ErrorResponse(`Song not found with filename ${filename}`, 404));
    }
    const totalLength = fileInfo[0].length;
    
    // Parse the Range header if it exists
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
        const parts = rangeHeader.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : totalLength - 1;
        
        // Set the response headers for the byte range
        res.status(206);
        res.set('Content-Range', `bytes ${start}-${end}/${totalLength}`);
        res.set('Content-Length', end - start + 1);
        
        // Stream the requested byte range
        downloadStream
            .pipe(res, { start, end })
            .on('error', (error) => {
                next(error);
            });
    } else {
        // If no Range header, stream the entire file
        res.set('Content-Length', totalLength);
        downloadStream.pipe(res);
    }
});


// all and genre songs
const getAllSongs = asyncHandler(async (req, res, next) => {
    const {genre, title} = req.query;

    let songs;
    if(title && !genre){
        songs = await Song.find({title: {$regex: title, $options: 'i'}}).sort({ createdAt: -1 });
    }
    else if(genre === 'All' || !genre){
        songs = await Song.find({}).sort({ title: 1, genre: -1 });
    }
    else {
        songs = await Song.find({genre}).sort({ createdAt: -1 });
    }

    if(!songs){
        return next(new ErrorResponse(`Songs not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: songs,
        nbhits: songs.length
    });
});

const getSong = asyncHandler(async (req, res, next) => {
    const song = await Song.findById({_id: req.params.songId});
    if(!song){
        return next(new ErrorResponse(`Song not found with id of ${req.params.songId}`, 404));
    }
    
    res.status(200).json({
        success: true,
        data: song
    });
});

const createSong = asyncHandler(async (req, res, next) => {
    // console.log("req.body", req.body);
    // console.log("req.file", req.file);
    if(!req.file){
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    req.body.songUrl = req.file.filename;
    const song = await Song.create({...req.body});
    res.status(201).json({
        success: true,
        data: song
    })
});


const updateSong = asyncHandler(async (req, res, next) => {
    const song = await Song.findOneAndUpdate(
        { _id: req.params.songId },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if(!song){
        return next(new ErrorResponse(`Song not found with id of ${req.params.songId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: song
    });
});

const deleteSong = asyncHandler(async (req, res, next) => {
    const song = await Song.findByIdAndDelete(req.params.songId);
    if(!song){
        return next(new ErrorResponse(`Song not found with id of ${req.params.songId}`, 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});


module.exports = {
    streamSongUrl,
    getAllSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong
};
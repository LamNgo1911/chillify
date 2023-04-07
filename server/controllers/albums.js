const Album = require('../models/album');
const Song = require('../models/song');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all albums
// @route   GET /api/v1/albums
// @access  Public
const getAlbums = asyncHandler(async (req, res, next) => {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: albums
    });
});

// @desc    Get single album
// @route   GET /api/v1/albums/:albumId
// @access  Public
const getAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findById(req.params.albumId);
    if(!album){
        return next(new ErrorResponse(`Album not found with id of ${req.params.albumId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: album
    });
});

// @desc    Create new album
// @route   POST /api/v1/albums
// @access  Private
const createAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.create(req.body);
    res.status(201).json({
        success: true,
        data: album
    });
});

// @desc    Update album
// @route   PUT /api/v1/albums/:albumId
// @access  Private
const updateAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findByIdAndUpdate(
        { _id: req.params.albumId },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if(!album){
        return next(new ErrorResponse(`Album not found with id of ${req.params.albumId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: album
    });
});

// @desc    Delete album
// @route   DELETE /api/v1/albums/:id
// @access  Private
const deleteAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findByIdAndDelete(req.params.albumId);
    if(!album){
        return next(new ErrorResponse(`Album not found with id of ${req.params.albumId}`, 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Get all songs from an album
// @route   GET /api/v1/albums/:albumId/songs
// @access  Public
const getAlbumSongs = asyncHandler(async (req, res, next) => {
    const album = await Album.find({albumName: req.params.albumId})
    if(!album){
        return next(new ErrorResponse(`Album not found with album name of ${req.params.albumId}`, 404));
    }

    const songs = await Song.find({ 'album.albumId': req.params.albumId });
    res.status(200).json({
        success: true,
        data: songs
    });
});

// @desc    Get single song from an album
// @route   GET /api/v1/albums/:albumId/songs/:songId
// @access  Public
const getAlbumSong = asyncHandler(async (req, res, next) => {
    const album = await Album.find({albumName: req.params.albumId})
    
    if(!album){
        return next(new ErrorResponse(`Album not found with album name of ${req.params.albumId}`, 404));
    }
    const song = await Song.findById(req.params.songId);
    if(!song){
        return next(new ErrorResponse(`Song not found with id of ${req.params.songId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: song
    });
});

module.exports = {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumSongs,
    getAlbumSong
};
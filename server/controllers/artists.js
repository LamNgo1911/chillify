const Song = require('../models/song');
const ArtistSchema = require('../models/artist');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all artists
// @route   GET /api/v1/artists
// @access  Public
const getArtists = asyncHandler(async (req, res, next) => {
    const artists = await ArtistSchema.find().sort({ createdAt: 1 });
    res.status(200).json({
        success: true,
        data: artists
    });
});

// @desc    Get single artist
// @route   GET /api/v1/artists/:artistId
// @access  Public
const getArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.findById(req.params.artistId);
    if(!artist){
        return next(new ErrorResponse(`Artist not found with id of ${req.params.artistId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: artist
    });
});

// @desc    Create new artist
// @route   POST /api/v1/artists
// @access  Private
const createArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.create(req.body);
    res.status(201).json({
        success: true,
        data: artist
    });
});

// @desc    Update artist
// @route   PUT /api/v1/artists/:artistId
// @access  Private
const updateArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.findByIdAndUpdate(
        { _id: req.params.artistId },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if(!artist){
        return next(new ErrorResponse(`Artist not found with id of ${req.params.artistId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: artist
    });
});

// @desc    Delete artist
// @route   DELETE /api/v1/artists/:artistId
// @access  Private
const deleteArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.findByIdAndDelete(req.params.artistId);
    if(!artist){
        return next(new ErrorResponse(`Artist not found with id of ${req.params.artistId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc  get songs by artist
// @route GET /api/v1/chart/artists/:artistId/songs
// @access Public
const getSongsByArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.findById( req.params.artistId);

    if(!artist){
        return next(new ErrorResponse(`Artist not found with id of ${req.params.artistId}`, 404));
    }
//    find songs by an object and populate the artist
    const songs = await Song.find({ 'artist.artistId': req.params.artistId});
   
    res.status(200).json({
        success: true,  
        data: songs
    });
});

// @desc  get song by artist
// @route GET /api/v1/chart/artists/:artistId/songs/:songId
// @access Public
const getSongByArtist = asyncHandler(async (req, res, next) => {
    const artist = await ArtistSchema.findById( req.params.artistId);
    if(!artist){
        return next(new ErrorResponse(`Artist not found with id of ${req.params.artistId}`, 404));
    }
   
    const song = await Song.find({ [artist.artistId]: req.params.artistId, _id: req.params.songId});
    if(!song){
        return next(new ErrorResponse(`Song not found with artist id of ${req.params.artistId} and song id of ${req.params.songId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: song
    });

});

module.exports = {
    getArtists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist,
    getSongsByArtist
};
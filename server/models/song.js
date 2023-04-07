const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    songUrl: {
        type: String,
        required: [true, 'Please add a songUrl'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'Title can not be more than 50 characters']
    },
    artist: {
        artistName: {
            type: String,
            required: [true, 'Please add an artistName'],
            trim: true,
            maxlength: [50, 'ArtistName can not be more than 50 characters']
        },
        artistId: {
            // objectId
            type: String,
            ref: 'Artist',
            required: [true, 'Please add an artistId'],
            trim: true,
            maxlength: [50, 'ArtistId can not be more than 50 characters']
        },
    },
    album: {
        albumName: {
            type: String,
            required: [true, 'Please add an albumName'],
            trim: true,
            maxlength: [50, 'AlbumName can not be more than 50 characters']
        },
        albumId: {
            // objectId
            type: String,
            ref: 'Album',
            required: [true, 'Please add an albumId'],
            trim: true,
            maxlength: [50, 'AlbumId can not be more than 50 characters']
        },
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
        trim: true,
        maxlength: [50, 'Genre can not be more than 50 characters']
    },
    lyrics: {
        type: String,
        required: [true, 'Please add lyrics'],
    },
    songImage: {
        type: String,
        required: [true, 'Please add a songImage'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Song', SongSchema);

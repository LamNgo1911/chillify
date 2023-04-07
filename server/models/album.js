const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    albumName: {
        type: String,
        required: [true, 'Please add an albumName'],
        trim: true,
        maxlength: [50, 'AlbumName can not be more than 50 characters']
    },
    albumImage: {
        type: String,
        required: [true, 'Please add an albumImage'],
        trim: true,
    },
    artist: {
        artistName: {
            type: String,
            required: [true, 'Please add an artistName'],
            trim: true,
            maxlength: [50, 'ArtistName can not be more than 50 characters']
        },
        artistId: {
            type: String,
            required: [true, 'Please add an artistId'],
            trim: true,
            maxlength: [50, 'ArtistId can not be more than 50 characters']
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Album', AlbumSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    artistName: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    artistImage: {
        type: String,
        required: [true, 'Please add an artistImage'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Artist', ArtistSchema);
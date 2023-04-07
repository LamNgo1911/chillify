// connect to the database v.7
const mongoose = require('mongoose');

const connectDB = (uri) => {
    mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);c
    });
}

module.exports = connectDB;
const express = require('express');
const {upload} = require('../middleware/uploads');
const router = express.Router();
const { getAllSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong,
    streamSongUrl} = require('../controllers/songs');

// for public
router.route('/stream/:filename').get(streamSongUrl);
router.route('/songs').get(getAllSongs).post(upload.single("songUrl"),createSong)
router.route('/songs/:songId').get(getSong).patch(updateSong).delete(deleteSong);

module.exports = router;


const express = require('express');
const router = express.Router();

const {
    getArtists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist,
    getSongsByArtist
} = require('../controllers/artists');

router.route('/artists').get(getArtists).post(createArtist);
router.route('/artists/:artistId').get(getArtist).put(updateArtist).delete(deleteArtist);
router.route('/artists/:artistId/songs').get(getSongsByArtist);

module.exports = router;

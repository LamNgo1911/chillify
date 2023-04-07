const express = require('express');
const router = express.Router();

const {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumSongs,
    getAlbumSong
} = require('../controllers/albums');

router.route('/albums').get(getAlbums).post(createAlbum);
router.route('/albums/:albumId').get(getAlbum).put(updateAlbum).delete(deleteAlbum);
router.route('/albums/:albumId/songs').get(getAlbumSongs);
router.route('/albums/:albumId/songs/:songId').get(getAlbumSong)

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/select', (req, res) => {
    const query = 'SELECT * FROM selectplacedb';

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

module.exports = router;

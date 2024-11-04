const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/tag', (req, res) => {
    const query = 'SELECT Tag_Name FROM tagdb ORDER BY RAND() LIMIT 3';

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

module.exports = router;

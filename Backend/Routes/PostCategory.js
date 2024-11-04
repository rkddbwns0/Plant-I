const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/category', (req, res) => {
    const query = 'SELECT * FROM postcategory';

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = `SELECT * FROM notification WHERE id = ? ORDER BY regDate DESC`;
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/delete', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = `DELETE FROM notification WHERE id = ?`;
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

module.exports = router;

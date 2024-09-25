const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/locationInfo', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const { lat, lon } = req.body;
        const userId = req.session.user.id;

        const checkQuery = 'SELECT * FROM userlocationdb where Id = ?';
        db.query(checkQuery, [userId], (error, result) => {
            if (error) {
                console.error(error);
                return;
            }

            if (result.length > 0) {
                const updateQuery = 'UPDATE userlocationdb SET lat = ?, lon = ? WHERE Id = ?';
                db.query(updateQuery, [lat, lon, userId], (error, result) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    res.json(result);
                });
            } else {
                const insertQuery = 'INSERT INTO userlocationdb (Id, lat, lon) VALUES (?, ?, ?)';
                db.query(insertQuery, [userId, lat, lon], (error, result) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    res.json(result);
                });
            }
        });
    }
});

router.post('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = 'SELECT lat, lon FROM userlocationdb WHERE Id = ?';
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            res.json(result);
        });
    }
});

module.exports = router;

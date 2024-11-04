const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/like', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { Pname } = req.body;

        const query = "INSERT INTO userfavoritedb (Id, Pname, isliked) VALUES (?, ?, 'Yes')";
        db.query(query, [userId, Pname], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/unlike', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { Pname } = req.body;

        const query = 'DELETE FROM userfavoritedb WHERE Id = ? AND Pname = ?';
        db.query(query, [userId, Pname], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/checkLike', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { Pname } = req.body;

        const query = 'SELECT * FROM userfavoritedb WHERE Id = ? and Pname = ?';
        db.query(query, [userId, Pname], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/liked', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { type } = req.query;
        let query;
        let params;

        if (type === '전체') {
            query = `
            SELECT userfavoritedb.*, plantdb.Image 
            FROM userfavoritedb INNER JOIN plantdb ON 
            userfavoritedb.pname = plantdb.pname WHERE userfavoritedb.Id = ?
            `;
            params = [userId];
        } else if (type === '그 외') {
            query = `
            SELECT userfavoritedb.Pname, plantdb.Image
            FROM userfavoritedb
            INNER JOIN plantdb ON userfavoritedb.Pname = plantdb.Pname
            WHERE userfavoritedb.Id = ? AND plantdb.PlantType NOT IN ('허브', '다육이', '선인장', '관엽식물')
            `;
            params = [userId];
        } else {
            query = `
            SELECT userfavoritedb.Pname, plantdb.Image
            FROM userfavoritedb INNER JOIN plantdb ON
            userfavoritedb.Pname = plantdb.Pname WHERE userfavoritedb.Id = ? AND plantdb.PlantType = ?
            `;
            params = [userId, type];
        }

        db.query(query, params, (error, result) => {
            if (error) {
                console.error('Error fetching liked plants:', error);
                return;
            }
            res.json(result);
        });
    }
});

router.post('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = `SELECT userfavoritedb.*, plantdb.Image FROM userfavoritedb INNER JOIN plantdb ON userfavoritedb.pname = plantdb.pname WHERE userfavoritedb.Id = ?`;
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/insert', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const userNname = req.session.user.Nname;
        const { Post_Id, Content } = req.body;
        const RegDate = new Date();

        const query = 'insert into commentdb (Post_Id, User_Id, User, Content, RegDate) values (?, ?, ?, ?, ?)';
        db.query(query, [Post_Id, userId, userNname, Content, RegDate], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/select', (req, res) => {
    const { Post_Id } = req.body;

    const query =
        'SELECT commentdb.*, userdb.image FROM commentdb JOIN userdb ON commentdb.User_Id = userdb.id WHERE commentdb.Post_Id = ?';
    db.query(query, [Post_Id, Post_Id], (error, result) => {
        if (error) {
            console.error(error);
        }

        const comment_countQuery = `SELECT COUNT(*) AS comment_count FROM commentdb WHERE Post_Id = ?`;
        db.query(comment_countQuery, [Post_Id], (error, countResult) => {
            if (error) {
                console.error(error);
            }

            res.json({ result: result, countResult: countResult[0].comment_count });
        });
    });
});

router.post('/delete', (req, res) => {
    const { No } = req.body;
    const query = 'DELETE FROM commentdb WHERE Post_Id = ?';

    db.query(query, [No], (result, error) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

module.exports = router;

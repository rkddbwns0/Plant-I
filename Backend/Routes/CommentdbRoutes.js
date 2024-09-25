const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/insert', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const userNname = req.session.user.Nname;
        const { Post_Id, Content } = req.body;
        const RegDate = new Date();

        const query = 'insert into Commentdb (Post_Id, User_Id, User, Content, RegDate) values (?, ?, ?, ?, ?)';
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
        'SELECT commentdb.*, userdb.image FROM Commentdb JOIN userdb ON Commentdb.User_Id = userdb.id WHERE Commentdb.Post_Id = ?';
    db.query(query, [Post_Id], (error, result) => {
        if (error) {
            console.error(error);
        } else {
        }
        res.json(result);
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

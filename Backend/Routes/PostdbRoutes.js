const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.post('/insert', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const userNname = req.session.user.Nname;
        const { Title, Content, Category, Image } = req.body;
        const RegDate = new Date();

        const query =
            'insert into postdb (Id, Writer, Title, Content, Category, Image, RegDate) values (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [userId, userNname, Title, Content, Category, Image, RegDate], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/select', (req, res) => {
    const { No } = req.body;
    const userId = req.session.user.id;

    const query = 'SELECT * FROM postdb WHERE No = ?';

    if (req.session.user && req.session.user.id) {
        db.query(query, [No, userId], (error, result) => {
            if (error) {
                console.error(error);
            }

            if (result.length > 0) {
                const post = result[0];
                const postId = post.Id;
                const isWriter = post.Id === userId;

                res.json({ data: result, writer: isWriter, postId: postId });
            }
        });
    }
});

router.post('/selectCategory', (req, res) => {
    const { Category } = req.body;

    const query = `
    SELECT postdb.No, postdb.Id, postdb.Title, postdb.Writer, postdb.RegDate, postdb.Content, postcategory.Category, postdb.Image, COUNT(commentdb.no) AS comment_count, userdb.image AS user_image 
    FROM postdb 
    LEFT JOIN commentdb ON postdb.No = commentdb.Post_Id
    LEFT JOIN userdb ON postdb.Id = userdb.id
    LEFT JOIN postcategory ON postdb.Category = postcategory.Id   
    WHERE postdb.Category = ?
    GROUP BY postdb.No, postdb.Id, postdb.Title, postdb.Writer, postdb.RegDate, postdb.Content, postcategory.Category, postdb.Image, userdb.image 
    ORDER BY postdb.RegDate DESC
    `;
    db.query(query, [Category], (error, result) => {
        if (error) {
            console.error(error);
        }

        if (result.length === 0) {
            res.json([]);
            return;
        }
        res.json(result);
    });
});

router.post('/search', (req, res) => {
    const query = `
    SELECT postdb.No, postdb.Id, postdb.Title, postdb.Writer, postdb.RegDate, postdb.Content, postcategory.category, postdb.Image, COUNT(commentdb.no) AS comment_count, userdb.image AS user_image 
    FROM postdb 
    LEFT JOIN commentdb ON postdb.No = commentdb.Post_Id
    LEFT JOIN userdb ON postdb.Id = userdb.id
    LEFT JOIN postcategory ON postdb.Category = postcategory.Id   
    GROUP BY postdb.No, postdb.Id, postdb.Title, postdb.Writer, postdb.RegDate, postdb.Content, postdb.Category, postdb.Image, userdb.image
    `;
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/myPost', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = `
        SELECT postdb.No, postdb.Id, postdb.Writer, postdb.Title, 
        postdb.Content, postdb.Image, postdb.RegDate, 
        postcategory.Category, userdb.image AS user_image
        FROM postdb
        LEFT JOIN commentdb ON postdb.No = commentdb.Post_Id
        LEFT JOIN postcategory ON postdb.Category = postcategory.Id
        LEFT JOIN userdb ON postdb.Id = userdb.id
        WHERE postdb.Id = ?
        GROUP BY postdb.No, postdb.Id,postdb.Writer, postdb.Title, postdb.Content, postdb.Image, postcategory.Category, userdb.image
        ORDER BY postdb.RegDate DESC
        `;
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            const countQuery = `SELECT COUNT(*) AS count_post FROM postdb WHERE Id = ?`;
            db.query(countQuery, [userId], (error, countResult) => {
                if (error) {
                    console.error(error);
                }
                res.json({ result: result, countResult: countResult[0].count_post });
            });
        });
    }
});

router.post('/myComment', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = `
        SELECT postdb.No, postdb.Id, postdb.Writer, postdb.Title, postdb.Content, postdb.Image, postdb.RegDate,
               postcategory.Category,
               commentdb.Content, userdb.image AS user_image
        FROM postdb
        LEFT JOIN postcategory ON postdb.Category = postcategory.Id
        LEFT JOIN commentdb ON postdb.No = commentdb.Post_Id AND commentdb.User_Id = ?    
        LEFT JOIN userdb ON postdb.Id = userdb.id
        WHERE commentdb.User_Id = ?  
        GROUP BY postdb.No, postdb.Id, postdb.Writer, postdb.Title, postdb.Content, postdb.Image, postdb.RegDate,
        postcategory.Category, commentdb.Content, userdb.image
        ORDER BY postdb.RegDate DESC
        `;

        db.query(query, [userId, userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            const countQuery = `SELECT COUNT(*) AS comment_count FROM commentdb WHERE User_Id = ?`;
            db.query(countQuery, [userId], (error, countResult) => {
                if (error) {
                    console.error(error);
                }
                res.json({ result: result, countResult: countResult[0].comment_count });
            });
        });
    }
});

router.post('/delete', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { No } = req.body;

        const query = 'delete from postdb where Id = ? and No = ?';
        db.query(query, [userId, No], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/update', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { No, Title, Content, Image, RegDate } = req.body;

        let query = 'update postdb set ';
        const params = [];

        if (Title !== undefined) {
            query += 'Title = ?,';
            params.push(Title);
        }

        if (Content !== undefined) {
            query += 'Content = ?,';
            params.push(Content);
        }

        if (Image !== undefined) {
            query += 'Image = ?';
            params.push(Image);
        }

        query += 'where Id = ? and No = ? and RegDate = ?';
        params.push(userId);
        params.push(No);
        params.push(RegDate);

        db.query(query, params, (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

module.exports = router;

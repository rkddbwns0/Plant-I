const express = require('express');
const router = express.Router();
const db = require('../dbConnection');
const { sendNotification } = require('../config/expo');

router.post('/insert', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { userMessage, image, result } = req.body;
        const title = '건강 상태 결과 저장';
        const body = `오늘 ${userId}님이 검사한 건강 상태 결과가 저장되었어요!\t마이페이지에서 확인해 보세요!😀`;
        const regDate = new Date();
        const messageImage = 'https://rkddbwns123.mycafe24.com/gnuboard5/notificationImage/regPlant.webp';

        const selectToken = `SELECT userToken FROM userdb WHERE id = ?`;
        db.query(selectToken, [userId], (error, tokenReuslt) => {
            if (error) {
                console.error(error);
            }

            const userToken = tokenReuslt[0]?.userToken;
            const query = `INSERT INTO chatbotresultdb (id, userMessage, image, result, regDate) VALUES (?, ?, ?, ?, ?)`;
            db.query(query, [userId, userMessage, image, result, regDate], async (error, Queryresult) => {
                if (error) {
                    console.error(error);
                } else {
                    await sendNotification(userToken, title, body);
                }
                const messageQuery = `INSERT INTO notification (id, title, message, image, regDate) VALUES (?, ?, ?, ?, ?)`;
                db.query(messageQuery, [userId, title, body, messageImage, regDate], (error, messageResult) => {
                    if (error) {
                        console.error(error);
                    }
                    res.json(Queryresult);
                });
            });
        });
    }
});

router.post('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = 'SELECT * FROM chatbotresultdb WHERE id = ?';
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            const count_data = 'SELECT COUNT(*) AS count_data FROM chatbotresultdb WHERE id = ?';
            db.query(count_data, [userId], (error, countResult) => {
                if (error) {
                    console.error(error);
                }
                res.json({ result: result, countResult: countResult[0].count_data });
            });
        });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../dbConnection');
const { sendNotification } = require('../config/expo');

router.get('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const query = `
            SELECT *, (SELECT COUNT(*) FROM userplantdb WHERE Id = ?) AS total_count 
            FROM userplantdb 
            WHERE Id = ?
        `;
        db.query(query, [userId, userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/select/Watering_Time', (req, res) => {
    const query = 'SELECT Watering_Time FROM userplantdb';

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/insert', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { Pname, PNname, Plant_Date, Last_Watered, Place, Image } = req.body;
        const title = '식물등록';
        const body = `내 반려식물 ${PNname}이(가) 등록되었습니다!\t소중한 ${PNname}을(를) 사랑과 정성으로 예쁘게 가꾸어 주세요 🌿`;
        const regDate = new Date();
        const messageImage = 'https://rkddbwns123.mycafe24.com/gnuboard5/notificationImage/regPlant.webp';

        const getToken = 'SELECT userToken FROM userdb WHERE id = ?';
        db.query(getToken, [userId], (error, tokenResult) => {
            if (error) {
                console.error(error);
            }

            const userToken = tokenResult[0]?.userToken;

            if (Image === '' || Image === null) {
                const getPlantType = 'SELECT PlantType FROM plantdb WHERE Pname = ?';
                db.query(getPlantType, [Pname], (error, result) => {
                    if (error) {
                        console.error(error);
                    }

                    let plantType = '그 외';
                    if (result.length > 0) {
                        plantType = result[0].PlantType;

                        if (
                            plantType !== '선인장' &&
                            plantType !== '허브' &&
                            plantType !== '관엽식물' &&
                            plantType !== '다육이'
                        ) {
                            plantType = '그 외';
                        }

                        const getImage = 'SELECT plantIconImage FROM planticonimage WHERE PlantType = ?';

                        db.query(getImage, [plantType], (error, result) => {
                            if (error) {
                                console.error(error);
                            }
                            if (result.length > 0) {
                                const plantIconImages = result[0].plantIconImage;

                                const insertQuery =
                                    'INSERT INTO userplantdb (Id, Pname, PNname, Plant_Date, Last_Watered, Place, Image) VALUES (?, ?, ?, ?, ?, ?, ?)';
                                db.query(
                                    insertQuery,
                                    [userId, Pname, PNname, Plant_Date, Last_Watered, Place, plantIconImages],
                                    async (error, result) => {
                                        if (error) {
                                            console.error(error);
                                        } else {
                                            await sendNotification(userToken, title, body);
                                            const messageQuery = `INSERT INTO notification (id, title, message, image, regDate) VALUES (?, ?, ?, ?, ?)`;
                                            db.query(
                                                messageQuery,
                                                [userId, title, body, messageImage, regDate],
                                                (error, messageResult) => {
                                                    if (error) {
                                                        console.error(error);
                                                    }
                                                    res.json(result);
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            } else {
                const query =
                    'insert into userplantdb (Id, Pname, PNname, Plant_Date, Last_Watered, Place, Image) VALUES (?, ?, ?, ?, ?, ?)';
                db.query(
                    query,
                    [userId, Pname, PNname, Plant_Date, Last_Watered, Place, Image],
                    async (error, result) => {
                        if (error) {
                            console.error(error);
                        } else {
                            await sendNotification(userToken, title, body);
                            const messageQuery = `INSERT INTO notification (id, title, message, image, regDate) VALUES (?, ?, ?, ?, ?)`;
                            db.query(
                                messageQuery,
                                [userId, title, body, messageImage, regDate],
                                (error, messageResult) => {
                                    if (error) {
                                        console.error(error);
                                    }
                                    res.json(result);
                                }
                            );
                        }
                    }
                );
            }
        });
    }
});

router.post('/update/Watering_Time', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const { Watering_Time, No } = req.body;

        const query = 'UPDATE userplantdb SET Watering_Time = ? WHERE No = ? and Id = ? ';
        db.query(query, [Watering_Time, No, userId], (error, result) => {
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
        const { No, Pname, PNname, Plant_Date, Last_Watered, Place, Image } = req.body;

        let query = 'update userplantdb set ';
        const params = [];

        if (PNname !== undefined) {
            query += 'PNname = ?,';
            params.push(PNname);
        }

        if (Plant_Date !== undefined) {
            query += 'Plant_Date = ?,';
            params.push(Plant_Date);
        }

        if (Last_Watered !== undefined) {
            query += 'Last_Watered = ?,';
            params.push(Last_Watered);
        }

        if (Place !== undefined) {
            query += 'Place = ?,';
            params.push(Place);
        }

        if (Image !== undefined) {
            query += 'Image = ?,';
            params.push(Image);
        }

        if (params.length > 0) {
            query = query.slice(0, -1);
        }

        query += ' where No = ? and Id = ? and Pname = ?';
        params.push(No);
        params.push(userId);
        params.push(Pname);

        db.query(query, params, (error, result) => {
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
        const { No, Pname, PNname, Plant_Date, Place } = req.body;

        const query =
            'delete from userplantdb where No = ? and Id = ? and Pname = ? and PNname = ? and Plant_Date = ? and Place = ?';
        db.query(query, [No, userId, Pname, PNname, Plant_Date, Place], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/popular', (req, res) => {
    const query = `SELECT userplantdb.Pname, COUNT(*) AS plant_count, plantdb.Image
        FROM userplantdb 
        LEFT JOIN plantdb ON userplantdb.Pname = plantdb.Pname
        GROUP BY userplantdb.Pname, plantdb.Image ORDER BY plant_count desc limit 6`;

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

module.exports = router;

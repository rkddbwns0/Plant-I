const express = require('express');
const router = express.Router();
const db = require('../dbConnection');

router.get('/plantData', (req, res) => {
    const query = 'select * from plantdb';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching plant data:', err);
            return;
        }
        res.json(result);
    });
});

router.get('/search', (req, res) => {
    const query = `SELECT Pname, Image FROM plantdb`;
    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.get('/Pname', (req, res) => {
    const query = 'SELECT Pname, Image FROM plantdb';

    db.query(query, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.get('/plantInfo', (req, res) => {
    const { Pname } = req.query;

    const query = 'SELECT * FROM plantdb WHERE Pname Like ?';
    db.query(query, [Pname], (error, result) => {
        if (error) {
            console.error(error);
        } else {
            if (result.length > 0) {
                res.json(result);
            }
        }
    });
});

router.post('/plantType', (req, res) => {
    const { Pname } = req.body;

    const query = 'SELECT PlantType FROM plantdb WHERE Pname = ?';
    db.query(query, [Pname], (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/selectTag', (req, res) => {
    const { PlantType, Children } = req.body;

    let query = 'SELECT Pname, Image, Child FROM plantdb WHERE ';
    const values = [];

    if (PlantType) {
        query += 'PlantType = ? ';
        values.push(PlantType);
    }

    if (Children === 1) {
        if (PlantType) {
            query += 'AND ';
        }
        query += 'Child = ? ';
        values.push('x');
    }

    query += 'ORDER BY Pname';

    db.query(query, values, (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/Result', (req, res) => {
    const { purpose, Child, MBTI } = req.body;
    let resultType = '';

    let query = 'SELECT Pname, MBTI, Image FROM plantdb WHERE 1=1';
    const values = [];

    if (purpose === '베란다') {
        query += ' AND purpose LIKE ?';
        values.push('%관상용%');
    } else if (purpose === '침실(안방)') {
        query += ' AND (purpose LIKE ? OR purpose LIKE ? OR purpose LIKE ?)';
        values.push('%공기정화%', '%관상용%', '%향기%');
    } else if (purpose === '거실') {
        query += ' AND (purpose LIKE ? OR purpose LIKE ?)';
        values.push('%공기정화%', '%관상용%');
    } else if (purpose === '야외') {
        query += ' AND purpose LIKE ?';
        values.push('%관상용%');
    }

    if (Child === '네') {
        query += ' AND Child = ?';
        values.push('x');
    } else {
        query += ' AND (Child = ? OR Child = ?)';
        values.push('o', 'x');
    }

    if (MBTI === 'IJ') {
        query += ' AND MBTI LIKE ?';
        values.push('%IJ%');
        resultType = '차분한 이끼형';
    } else if (MBTI === 'IP') {
        query += ' AND MBTI LIKE ?';
        values.push('%IP%');
        resultType = '신비로운 다육형';
    } else if (MBTI === 'EJ') {
        query += ' AND MBTI LIKE ?';
        values.push('%EJ%');
        resultType = '활기찬 해바라기형';
    } else if (MBTI === 'EP') {
        query += ' AND MBTI LIKE ?';
        values.push('%EP%');
        resultType = '튼튼한 선인장형';
    }

    query += ' ORDER BY RAND() LIMIT 6';

    db.query(query, values, (error, result) => {
        if (error) {
            console.error(error);
        }
        if (resultType) {
            const mbtiQuery = 'SELECT feature, recommend, Image FROM mbtiresultdb WHERE mbti = ?';
            db.query(mbtiQuery, [resultType], (mbtiError, mbtiResult) => {
                if (mbtiError) {
                    console.error(mbtiError);
                }
                res.json({ data: result, resultType: resultType, mbtiResult: mbtiResult });
            });
        }
    });
});

module.exports = router;

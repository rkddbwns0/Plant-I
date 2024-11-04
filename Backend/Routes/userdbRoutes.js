const express = require('express');
const router = express.Router();
const db = require('../dbConnection');
const session = require('express-session');

router.post('/login', (req, res) => {
    const { id, pw, userToken } = req.body;

    const query = 'SELECT * FROM userdb WHERE id = ? AND pw = ?';
    db.query(query, [id, pw], (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            const user = result[0];
            req.session.user = { id: user.id, Nname: user.Nname };

            const updateTokenQuery = 'UPDATE userdb SET userToken =? WHERE id = ?';
            db.query(updateTokenQuery, [userToken, user.id], (error, updateResult) => {
                if (error) {
                    console.error(error);
                    return;
                }
            });
            req.session.save((error) => {
                if (error) {
                    console.error(error);
                }
                res.json({ message: '로그인 성공' });
            });
        } else {
            res.json({ message: '로그인 실패' });
        }
    });
});

router.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                console.error(error);
            } else {
                res.json({ message: '로그아웃' });
            }
        });
    }
});

router.post('/checkUser', (req, res) => {
    const { id, Nname, Phone } = req.body;

    let query = '';
    let value = '';
    let type = '';

    if (id) {
        query = 'SELECT * FROM userdb WHERE id = ?';
        value = id;
        type = '아이디';
    } else if (Nname) {
        query = 'SELECT * FROM userdb WHERE Nname = ?';
        value = Nname;
        type = '닉네임';
    } else if (Phone) {
        query = 'SELECT * FROM userdb WHERE Phone = ?';
        value = Phone;
        type = '휴대폰 번호';
    }

    db.query(query, [value], (error, result) => {
        if (error) {
            console.error(error);
        }

        if (result.length > 0) {
            res.json({ message: `이미 사용 중인 ${type}입니다.` });
        } else if (result) {
            res.json({ message: `사용 가능한 ${type}입니다.` });
        }
    });
});

router.post('/insert', (req, res) => {
    const { id, pw, name, Phone, Nname } = req.body;
    const RegDate = new Date();

    const query = `insert into userdb (id, pw, name, Phone ,Nname, RegDate, image) values (?, ?, ?, ?, ?, ?, (SELECT image FROM profileimage))`;

    db.query(query, [id, pw, name, Phone, Nname, RegDate], (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/delete', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = 'delete from userdb where id = ?';
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/update', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const { Nname } = req.body;
        const userId = req.session.user.id;

        checkQuery = 'SELECT * FROM userdb WHERE Nname = ?';
        db.query(checkQuery, [Nname], (checkError, checkResult) => {
            if (checkError) {
                console.error(checkError);
            }

            if (checkResult.length > 0) {
                return res.json({ message: '이미 사용 중인 닉네임입니다.', change: false });
            } else if (Nname === '') {
                return res.json({ message: '닉네임을 입력해 주세요.', change: false });
            } else {
                const query = 'update userdb set Nname = ? where id = ?';
                db.query(query, [Nname, userId], (error, result) => {
                    if (error) {
                        console.error(error);
                    }

                    req.session.user.Nname = Nname;

                    const updateCommentQuery = 'UPDATE commentdb SET User = ? WHERE User_Id = ?';
                    db.query(updateCommentQuery, [Nname, userId], (commentError, commentResult) => {
                        if (commentError) {
                            console.error(error);
                        }
                        res.json({ message: '닉네임이 변경되었습니다.', result: result, change: true });
                    });
                });
            }
        });
    }
});

router.post('/updateprofile', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const { image } = req.body;
        const userId = req.session.user.id;

        const query = 'UPDATE userdb SET image = ? WHERE id = ?';
        db.query(query, [image, userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json({ message: '프로필이 변경되었습니다.', result: result });
        });
    }
});

router.post('/updateMBTI', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const { Ptype } = req.body;
        const userId = req.session.user.id;

        const query = 'UPDATE userdb SET Ptype = ? WHERE id = ?';
        db.query(query, [Ptype, userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/findingId', (req, res) => {
    const { name, Phone } = req.body;

    const query = 'select * from userdb where name = ? and Phone = ?';
    db.query(query, [name, Phone], (error, result) => {
        if (error) {
            console.error(error);
        }
        if (result.length > 0) {
            res.json({ message: '입력한 정보가 일치합니다.', type: true, id: result[0].id });
        } else {
            res.json({ message: '입력한 정보가 일치하지 않습니다. 다시 확인해 주세요.', type: false, id: null });
        }
    });
});

router.post('/findingPw', (req, res) => {
    const { id, Phone } = req.body;

    const query = 'select * from userdb where id = ? and Phone = ?';
    db.query(query, [id, Phone], (error, result) => {
        if (error) {
            console.error(error);
        }

        if (result.length > 0) {
            res.json({ message: '입력한 정보가 일치합니다.', type: true, id: result[0].id });
        } else {
            res.json({ message: '입력한 정보가 일치하지 않습니다. 다시 확인해 주세요.', type: false, id: null });
        }
    });
});

router.post('/editPw', (req, res) => {
    const { id, pw } = req.body;

    const query = 'update userdb set pw = ? where id = ?';
    db.query(query, [pw, id], (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/userNname', (req, res) => {
    const { Nname } = req.body;

    const query = 'select id from userdb where Nname = ?';
    db.query(query, [Nname], (error, result) => {
        if (error) {
            console.error(error);
        }
        res.json(result);
    });
});

router.post('/select', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;

        const query = 'SELECT * FROM userdb WHERE id = ?';
        db.query(query, [userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

router.post('/counts', (req, res) => {
    if (req.session.user && req.session.user.id) {
        const userId = req.session.user.id;
        const query = `SELECT 
        (SELECT COUNT(*) FROM userplantdb WHERE Id = ? ) AS userplant_counts,
        (SELECT COUNT(*) FROM postdb WHERE Id = ? ) AS post_counts,
        (SELECT COUNT(*) FROM commentdb WHERE User_Id = ? ) AS comment_counts
        `;
        db.query(query, [userId, userId, userId], (error, result) => {
            if (error) {
                console.error(error);
            }
            res.json(result);
        });
    }
});

module.exports = router;

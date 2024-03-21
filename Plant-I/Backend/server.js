// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user : 'plant',
  password: 'plt1234',
  database: 'plantdb',
  dateStrings: 'date' 
});

app.post('/userdb/login', (req, res) => {
  const { id, pw } = req.body;

  const query = "select * from userdb where id = ? and pw = ?";
  db.query(query, [id, pw] ,(err, result) => {

    if(err) throw err;

    if (result.length > 0) {
      res.json({ id: result[0].id, pw: result[0].pw });      
    } else {
      res.json({ success: false, message: "로그인 실패" });
    }
  });
});

app.get('/userdb/userId', (req, res) => {
  const { id } = req.query;

  const query = "SELECT * FROM userdb WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({err});
      return;
    }
    res.json(result);
  });
});

app.get('/userdb/nickname', (req, res) => {
  const { Nname } = req.query;

  const query = "select * from userdb where Nname = ?";
  db.query(query, [Nname], (err, result) => {
    if (err) {
      res.status(500).json({err});
      return;
    }
    res.json(result);
  });
});

app.get('/userdb', (req, res) => {

  const query = "select * from userdb";
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({err});
      return;
    }
    res.json(result);
  });
});


app.post('/userdb/insert', (req, res) => {
  const { id, pw, name ,Nname } = req.body;

  const query = "insert into userdb (id, pw, name ,Nname) values (?, ?, ?, ?)";

  db.query(query, [id, pw, name, Nname], (err, result) => {
    if (err) {
      console.log("회원가입 에러");
      res.status(500).json({ message: '회원가입 실패' });
    } else {
      res.status(200).json({ message: "회원가입 성공" });
    }
  })
})

app.post('/userdb/delete', (req, res) => {
  const { id } = req.body;

  const query = "delete from userdb where id = ?";
  db.query(query, [ id ], (err, result) => {
    if(err) {
      console.log('회원 탈퇴 에러');
      res.status(500).json({ message: '회원 탈퇴 실패', error: err });
    } else {
      res.status(200).json({ message: '회원 탈퇴 성공' });
    }
  })
})

app.post('/userdb/update', (req, res) => {
  const { Nname, id } = req.body

  const query = "update userdb set Nname = ? where id = ?";
  db.query(query, [Nname, id], (err, result) => {
    if(err) {
      console.log('update 에러');
      res.status(500).json({ message: '데이터 수정 실패' });
    } else {
      res.status(200).json({ message: '데이터 수정 성공' });
    }
  });
});

app.get('/userplantdb', (req, res) => {
  const userId = req.query.id;

  if (userId) {
    const query = 'select * from userplantdb where id = ?';
    db.query(query, [userId] ,(error, result) => {
      if (error) throw err;
      res.json(result);
    });
  }
});

app.post('/userplantdb', (req, res) => {
  const { id, pname, pnname, plant_date, place } = req.body;

  const query = "insert into userplantdb(id, pname, pnname, plant_date, place) values(?, ?, ?, ?, ?)";
  db.query(query, [id, pname, pnname, plant_date, place] ,(err, result) => {

    if (err) {
      console.error('insert 에러', err);
      res.status(500).json({ message : '데이터 저장 실패' });
    } else {
      res.status(200).json({ message : '데이터 저장 성공' });
    }
  });
});

app.put('/userplantdb', (req, res) => {
  const { id , pname ,pnname, plant_date, place } = req.body;

  let query = "update userplantdb set ";
  const params = [];
  
  if (pnname !== undefined) {
    query += "pnname = ?,";
    params.push(pnname);
  }

  if (plant_date !== undefined) {
    query += "plant_date = ?,";
    params.push(plant_date);
  }

  if (place !== undefined) {
    query += "place = ?,";
    params.push(place);
  }

  if (params.length > 0) {
    query = query.slice(0, -1);
  }

  query += " where id = ? and pname = ?";
  params.push(id);
  params.push(pname);

  //console.log(query, params);

  db.query(query, params, (err, result) => {
    if(err) {
      console.log('update 에러');
      res.status(500).json({ message: '데이터 수정 실패' });
    } else {
      res.status(200).json({ mesaage: '데이터 수정 성공' });
    }
  });
});

app.delete('/userplantdb', (req, res) => {
  const { id, pname, pnname, plant_date, place } = req.body;

  const query = "delete from userplantdb where id = ? and pname = ? and pnname = ? and plant_date = ? and place = ?";
  db.query(query, [id, pname, pnname, plant_date, place], (err, result) => {
    if (err) {
      console.log('delete 에러');
      res.status(500).json({ message: '데이터 삭제 실패', error: err });
    } else {
      res.status(200).json({ message: '데이터 삭제 성공' });
    }
  })
})

app.get("/plantData", (req, res) => {
  const query = "select * from plantdb";

  db.query(query, (err, rows) => {
    if (err) {
      console.error("Error fetching plant data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(rows);
  });
});

  app.get("/plants", (req, res) => {
  const plantName = "%" + req.query.name + "%";
  const query = `SELECT * FROM plantDB WHERE Pname LIKE ?`;

  db.query(query, [plantName], (err, rows) => {
    if (err) {
      console.error("Error searching plants:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    const plantDetail = rows[0];
    res.json(plantDetail);
  });
});

app.get('/plantdb', (req, res) => {

  const query = 'select * from plantdb';
  db.query(query, (err, result) => {
    if(err) {
      res.status(500).json({err});
      return;
    }
    res.json(result);
  });
});

app.get('/plantdb/pname', (req, res) => {

  const query = 'select pname from plantdb';
  db.query(query, (err, result) => {
    if(err) {
      res.status(500).json({err});
      return;
    }
    res.json(result);
  });
});

app.get("/search", (req, res) => {
  const searchQuery = "%" + req.query.query + "%";
  const query = `SELECT * FROM plantDB WHERE Pname LIKE ?`;

  db.query(query, [searchQuery], (err, rows) => {
    if (err) {
      console.error("Error searching:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const searchResults = rows.map((row) => ({ Pname: row.Pname })); // 칼럼 이름을 수정합니다.

    res.json(searchResults);
  });
});


// 좋아요 기능 라우트 (미완성)
/*app.post("/like", (req, res) => {
  const { userID, plantName } = req.body;

  // UserFavoriteDB 테이블에 사용자 ID와 식물 이름 추가
  const sql = "INSERT INTO UserFavoriteDB (ID, Pname) VALUES (?, ?)";
  connection.query(sql, [userID, plantName], (err, result) => {
    if (err) {
      console.error("Error liking plant:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log(`Plant ${plantName} liked by user ${userID}`);
      res.send("Plant liked!");
    }
  });
});
*/


app.listen(port, () => {
  console.log('연결 완료', {port});
})

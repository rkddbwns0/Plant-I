// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dbconfig = require('./db.js');
const conn = mysql.createConnection(dbconfig);

const app = express();
app.use(cors());
app.use(express.json());


app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send('Root');
});

app.get('/userdb', (req, res) => {
  conn.query('SELECT * from userdb', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

// app.listen(port, () => {
//   console.log('서버 연결됨', {port});
// });

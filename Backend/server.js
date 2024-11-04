require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const userdbRouter = require('./Routes/userdbRoutes');
const userPlantdbRouter = require('./Routes/userPlantdbRoutes');
const plantdbRouter = require('./Routes/plantdbRoutes');
const PostdbRouter = require('./Routes/PostdbRoutes');
const CommentdbRouter = require('./Routes/CommentdbRoutes');
const userFavoritedbRoutes = require('./Routes/userFavoritedbRoutes');
const TagdbRoutes = require('./Routes/TagdbRouters');
const WeatherDataRouters = require('./Routes/WeatherDataRouter');
const userLocationRouters = require('./Routes/userLocationRouter');
const selectplacedbRouters = require('./Routes/SelectPlacedbRoutes');
const uploadRouters = require('./Routes/uploadRouters');
const postCategory = require('./Routes/PostCategory');
const chatbotresult = require('./Routes/chatbotresultRoutes');
const notification = require('./Routes/notificationRoutes');

const app = express();
const port = 8080;

// 문자열 값 랜덤으로 추출
// const crypto = require('crypto');

// // Generate a random 64-byte hex string
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);

app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
);

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.use(express.json());

app.use('/userdb', userdbRouter);

app.use('/userplantdb', userPlantdbRouter);

app.use('/plantdb', plantdbRouter);

app.use('/Postdb', PostdbRouter);

app.use('/commentdb', CommentdbRouter);

app.use('/userfavoritedb', userFavoritedbRoutes);

app.use('/tagdb', TagdbRoutes);

app.use('/weather', WeatherDataRouters);

app.use('/userlocationdb', userLocationRouters);

app.use('/selectplacedb', selectplacedbRouters);

app.use('/upload', uploadRouters);

app.use('/postcategory', postCategory);

app.use('/chatbotresultdb', chatbotresult);

app.use('/notification', notification);

app.listen(port, '0.0.0.0', () => {
    console.log('연결완료', { port });
});

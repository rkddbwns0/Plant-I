const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const { v4: uuid4 } = require('uuid');
const sharp = require('sharp');

const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuid4()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: tempStorage });

router.post('/aiupload', upload.single('image'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'uploads', req.file.filename);
        const fileUrl = `http://172.30.1.67:8080/uploads/${req.file.filename}`;

        const response = await axios.post(`http://172.30.1.67:8082/upload`, {
            imageUrl: fileUrl,
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

router.post('/userPlantUploads', upload.single('image'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('업로드 파일 없음');
    }

    const processedImagePath = path.join('uploads', `processed-${file.filename}`);
    try {
        await sharp(file.path).resize(480, 480).jpeg({ quality: 90 }).toFile(processedImagePath);

        const formData = new FormData();
        formData.append('file', fs.createReadStream(processedImagePath), file.filename);
        const response = await axios.post('', formData, {
            headers: {
                ...formData.getHeaders(),
                Accept: 'application/json',
            },
        });
        const imageUrl = response.data.url;
        res.send({ imageUrl, tempFilePath: processedImagePath });
    } catch (error) {
        console.error(error);
    } finally {
        fs.unlink(processedImagePath, (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
});

router.post('/postImageUploads', upload.array('images', 10), async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('업로드 파일 없음');
    }

    const imageUrls = [];
    const processedImagePaths = [];

    try {
        for (let file of files) {
            const processedImagePath = path.join('uploads', `processed-${file.filename}`);
            await sharp(file.path).resize(480, 480).jpeg({ quality: 90 }).toFile(processedImagePath);

            const formData = new FormData();
            formData.append('file', fs.createReadStream(processedImagePath), file.filename);
            const response = await axios.post('', formData, {
                headers: {
                    ...formData.getHeaders(),
                    Accept: 'application/json',
                },
            });
            imageUrls.push(response.data.url);
            processedImagePaths.push(processedImagePath);
        }
        res.send({ imageUrls, tempFilePaths: processedImagePaths });
    } catch (error) {
        console.error(error);
    } finally {
        for (let file of files) {
            fs.unlink(file.path, (error) => {
                if (error) {
                    console.error(error);
                }
            });
        }
        for (let processedImagePath of processedImagePaths) {
            fs.unlink(processedImagePath, (error) => {
                if (error) console.error(error);
            });
        }
    }
});

router.post('filelize', (req, res) => {
    const { tempFilePath, finalFilePath } = req.body;

    fs.rename(tempFilePath, finalFilePath, (error) => {
        if (error) {
            console.error(error);
        }
        res.send({ success: true });
    });
});

router.post('/delete', async (req, res) => {
    const { imageUrl } = req.body;
    if (!imageUrl) {
        return res.status(400).send('이미지 URL 없음');
    }

    try {
        const response = await axios.post('https://rkddbwns123.mycafe24.com/gnuboard5/img/delete.php', {
            url: imageUrl,
        });
        res.send({ success: response.data.success });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;

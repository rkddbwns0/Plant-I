const fs = require('fs');
const path = require('path');
const tempUploadDir = path.join(__dirname, 'temp_uploads');

const getFileCreationTime = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.birthtime;
};

const deleteOldFiles = () => {
    const now = new Date().getTime();
    const threshold = 24 * 60 * 60 * 1000;

    fs.readdir(tempUploadDir, (error, files) => {
        if (error) {
            console.error(error);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(tempUploadDir, file);
            const fileCreationTime = getFileCreationTime(filePath).getTime();

            if (now - fileCreationTime > threshold) {
                fs.unlink(filePath, (error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(filePath);
                    }
                });
            }
        });
    });
};

setInterval(deleteOldFiles, 60 * 60 * 1000);

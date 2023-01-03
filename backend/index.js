const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const port = process.env.PORT || 8080;
const connection = require('./db/connect.js')
const insert = require('./routes/insert')
const delet = require('./routes/delete')



app.use(cors());
app.use(express.json())
app.use('/insert', insert)
app.use('/delete', delet)

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../node_react_mysql_image/frontend/src', 'images'),
    // destination: path.join(__dirname, './public', 'images'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


// this is to enter image to folder

app.post('/imageupload', async (req, res) => {
    try {
        let upload = multer({ storage: storage }).single('avatar');

        upload(req, res, function (err) {

            if (!req.file) {
                return res.send('Please select an image to upload');
            }


            const classifiedsadd = {
                image: req.file.filename
            };
            res.json(classifiedsadd)
        });

    } catch (err) { console.log(err) }
})



app.get('/display', (req, res) => {
    const img = "SELECT * FROM `users` WHERE 1"
    connection.query(img, (err, result) => {
        if (err)
            res.send("error happen")
        else
            res.send(result)
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
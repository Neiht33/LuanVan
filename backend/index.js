const express = require('express')
const app = express()
const path = require('path')
const port = 8080

const fs = require('fs');
var cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
//public 

app.use(express.static(path.join(__dirname, '/src/public/uploads')))
const imageDir = path.join(__dirname, '/src/public/uploads');
app.get('/images/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(imageDir, filename);

    // Kiểm tra xem tệp có tồn tại không
    if (fs.existsSync(imagePath)) {
        // Đọc nội dung của tệp và gửi về client
        const imageStream = fs.createReadStream(imagePath);
        imageStream.pipe(res);
    } else {
        res.status(404).json({ error: 'Image not found' });
    }
});

app.post('/', async (req, res) => {
    try {
        console.log(data);
    } catch (err) {
        res.json(err)
    }
})

const route = require('./src/routes/route')
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
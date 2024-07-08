const fs = require('fs');
const cors = require("cors")
const pdf = require('pdf-parse');
const express = require("express");
const { json } = require('stream/consumers');
const multer = require('multer');
const app = express();

const upload = multer({dest: 'uploads/'})

app.use(cors())
app.post("/", upload.single('file'), async (req, res) => {

    const filePath = req.file.path;
    let dataBuffer = fs.readFileSync(filePath);
    
    const extractedData = await pdf(dataBuffer);
    console.log(extractedData)
    return res.json({
        msg: extractedData.text
    })
})

app.listen(3001)


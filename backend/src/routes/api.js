const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbMan = require("../utils/dbMan");
const parseExcel = require("../utils/excelParser");

const upload = multer({
    dest: 'uploads/',
    limits: {fileSize: 10 * 1024 * 1024}, // Limit size of 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /xlsx|xls/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(extName) {
            return cb(null, true)
        } else {
            cb(new Error('Only Excel filess are allowed'))
        }
    }
})

router.post('/file', upload.single('file'),async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.')
        }
        const jsonData = await parseExcel(req.file)
    
        await dbMan.createTable(jsonData[0], jsonData[1])
        res.status(200).json({message: 'Excel data received successfully'})
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
})

router.get('/file', async (req, res) => {
    try{
        const users = await dbMan.getUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(500).send(err)
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbMan = require("../utils/dbMan");
const parseExcel = require("../utils/excelParser");
const gen = require("../utils/excelGen")

const upload = multer({
    dest: 'uploads/',
    limits: {fileSize: 10 * 1024 * 1024}, // Limit size of 10MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /xlsx|xls/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(extName) {
            return cb(null, true)
        } else {
            cb({message: 'Only Excel filess are allowed', code : 415})
        }
    }
})

router.post('/file', upload.single('file'),async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.')
        }
        const jsonData = await parseExcel(req.file)
    
        const ans = await dbMan.createTable(jsonData[0], jsonData[1])
        res.status(ans.code).json(ans.message)
    } catch (err) {
        res.status(err.code).send(err.message)
    }
})

router.post('/missions',upload.none() , async(req, res) => {
    try {
        const formData = req.body;
        const missions = Object.keys(formData).map(key => JSON.parse(formData[key]));        // while testing without the front this line is bugged
        const ans = await dbMan.createMissionTable(missions)
         res.status(200).send(ans)
    } catch (err){
        res.status(500).send(err)
    }
})

router.post('/excel', async(req, res) => {
    try{
        let file = req.body
        console.log(file)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/file', async (req, res) => {
    try{
        const users = await dbMan.getSoliders()
        res.status(200).json(users)
    } catch (err){
        res.status(err.code).send(err.message)
    }
})

router.get('/missions', async(req, res) => {
    try {
        const missions = await dbMan.getMissions()
        res.status(200).json(missions)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/excel', async(req, res) => {
    try{
        await gen()
        console.log("done")
        const excelFilePath = path.join(__dirname, '../../uploads/sample.xlsx')
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=sample.xlsx");
        res.status(200).sendFile(excelFilePath)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router
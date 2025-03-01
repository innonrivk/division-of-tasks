const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbMan = require("../utils/dbMan");
const parseExcel = require("../utils/excelParser");
const gen = require("../utils/excelGen")
const algo = require("../utils/algo")
const utils = require("../utils/utilFunc")

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

router.post('/excel', upload.any(), async(req, res) => {
    try{
        if(!req.files) {
            return res.status(400).send('No file uploaded')
        }

        const newExcel = req.files[0]
        utils.unlinkFile(newExcel.path)
        res.status(200).send("Hello world")
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
        let [solidersForMission, solidersWithMission] = await algo.main()

        await dbMan.createCurrentSolidersForMissionsTable(solidersWithMission)
        await gen(solidersForMission)

        const excelFilePath = path.join(__dirname, '../../uploads/sample.xlsx')
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=sample.xlsx");
        res.status(200).sendFile(excelFilePath)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get('/frames', async(req, res) => {
    try{
        const frames = await dbMan.getFrames()
        res.status(200).send(frames)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbMan = require("../utils/dbMan");
const parseExcel = require("../utils/excelParser");
const gen = require("../utils/excelGen")
const algo = require("../utils/algo")
const utils = require("../utils/utilFunc")
const fs = require("fs")

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

router.get('/algo', async(req, res) => {
    try{
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0].replaceAll('-', '_')
        let fileName = `excel_${formattedDate}.xlsx`
        const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));
        const result = await fileExists(`../db/excel_results/${fileName}`)
        if(result) {
            console.log("help")
            let [solidersForMission, solidersWithMission] = await algo.main()
            const excel_file = await gen(solidersForMission)
            const g = await utils.saveResultsToDB(excel_file, solidersWithMission)
            res.status(200).send("done")
        } else {
            console.log("pks")
            res.status(200).send("done")
        }
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/excel', async(req, res) => {
    try{
        const excel_id = await dbMan.getExcelId()
        const excel_file = await dbMan.getExcelFile(excel_id)
        console.log(excel_file)
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; excel_file=${excel_file.name}`);
        res.status(200).sendFile(path.join(__dirname, excel_file.full_path))
    } catch (err) {
        console.error(err)
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

router.get('/excelTable', async(req, res) => {
    try{
        const frames = await dbMan.getExcelTable()
        res.status(200).send(frames)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/solidersWith', async(req, res) => {
    try{
        const frames = await dbMan.getTableSoliderWithMission()
        res.status(200).send(frames)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router
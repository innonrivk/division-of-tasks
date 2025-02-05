const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbMan = require("../utils/dbMan");
const parseExcel = require("../utils/excelParser");
const algo = require('../utils/algo')

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
        console.log("formData", formData)
        const missions = Object.keys(formData).map(key => JSON.parse(formData[key]));
        console.log("missions", missions)
        console.log("missions", missions.forEach(mission => console.log(mission.percentage)))
        // const ans = await dbMan.createMissionTable(req.body)
         res.status(200).send("done")
    } catch (err){
        res.status(500).send(err)
    }
})

router.get('/file', async (req, res) => {
    try{
        const users = await dbMan.getUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(err.code).send(err.message)
    }
})

router.get('/missions', async(req, res) => {
    try {
        console.log("get missions", req.body)
        // const missions = await dbMan.getMissions()
        res.status(200).json("missions")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/excel', async(req, res) => {
    try{
        await algo.main()
        res.status(200).send("done")
    } catch (err) {
        res.status(err.code).send(err.message)
    }
})

module.exports = router
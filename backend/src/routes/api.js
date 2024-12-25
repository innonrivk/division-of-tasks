const express = require('express');
const router = express.Router();
const dbMan = require("../utils/dbMan");

router.post('/fileUpload/name', async (req, res) => {
    const jsonData = req.body
    try {
        await dbMan.createTable(jsonData)
        res.status(200).json({message: 'Excel data received successfully'})
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/getFile/name', async (req, res) => {
    try{
        const users = await dbMan.getUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = router
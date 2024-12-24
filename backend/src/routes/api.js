const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.json({message: 'Hello from Express!'})
})

//should be async function
router.post('/upload-excel-names', (req, res) => {
    const jsonData = req.body
    console.log("received json data", jsonData)
    res.status(200).json({message: 'Excel data received successfully'})
})

module.exports = router
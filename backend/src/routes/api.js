const express = require('express');
const router = express.Router();


router.post('/excel-files/names', async  (req, res) => {
    const jsonData = req.body
    console.log("received json data", jsonData)
    res.status(200).json({message: 'Excel data received successfully'})
})

module.exports = router
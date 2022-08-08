const express = require('express')
const router = express.Router()
const { pool } = require('../DB/db')

router.post('/:idx', async (req, res) => {
    const idx = req.body.payload
    console.log(idx)
    const sql = `SELECT * FROM transaction WHERE transactionHash='${idx}'`
    try {
        const [[result]] = await pool.query(sql)
        res.json(result)
    } catch (e) {
        console.error(e.message)
        res.json({})
    }
})

module.exports = router

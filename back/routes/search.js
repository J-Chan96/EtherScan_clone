const express = require('express')
const router = express.Router()
const { pool } = require('../DB/db')

router.post('/blockNumber', async (req, res) => {
    const { number } = req.body
    console.log(Number(number))
    const num = Number(number)
    const sql = `SELECT COUNT(*) as count from block WHERE number=${num}`

    const [[response]] = await pool.execute(sql)
    console.log(response)
    res.json(response)
})

router.post('/miner', async (req, res) => {
    const { miner } = req.body

    const sql = `SELECT * from block WHERE miner='${miner}'`

    const [response] = await pool.execute(sql)
    res.json(response)
})

router.post('/txHash', async (req, res) => {
    const { txHash } = req.body

    const sql = `SELECT * FROM transaction WHERE transactionHash='${txHash}'`

    const [[response]] = await pool.execute(sql)

    res.json(response.transactionHash)
})
module.exports = router

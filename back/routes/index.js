const express = require('express')
const router = express.Router()
const Web3 = require('web3')
const { pool } = require('../DB/db')

const source = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9000'))

router.post('/', async (req, res) => {
    try {
        const sql = `SELECT * FROM block ORDER BY number DESC LIMIT 10`
        const sql2 = `SELECT * FROM transaction ORDER BY blockNumber DESC, transactionIndex DESC LIMIT 10`
        const [result] = await pool.execute(sql)
        const [result2] = await pool.execute(sql2)
        res.json({ block: result, tx: result2 })
    } catch (e) {
        console.error(e.message)
        res.json({})
    }
})

module.exports = router

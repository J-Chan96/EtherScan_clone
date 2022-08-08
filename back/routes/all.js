const express = require('express')
const router = express.Router()
const { pool } = require('../DB/db')

router.post('/block', async (req, res) => {
    const sql = `SELECT difficulty, extraData, gasLimit, gasUsed, hash,
     miner, mixHash, nonce, number, parentHash, sha3Uncles, size, stateRoot,
     totalDifficulty, timestamp FROM block ORDER BY number DESC`

    try {
        const [result] = await pool.execute(sql)
        res.json(result)
    } catch (e) {
        console.error(e.message)
        res.json({})
    }
})

router.post('/tx', async (req, res) => {
    const sql = `SELECT * FROM transaction ORDER BY blockNumber DESC, transactionIndex DESC LIMIT 100`

    try {
        const [result] = await pool.execute(sql)
        res.json(result)
    } catch (e) {
        console.error(e.message)
        res.json({})
    }
})

module.exports = router

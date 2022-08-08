const express = require('express')
const router = express.Router()
const { pool } = require('../DB/db')
const web3 = require('web3')

const source = new web3(new web3.providers.HttpProvider('http://127.0.0.1:9000'))

router.post('/addblock', async (req, res) => {
    const latestBlock = await source.eth.getBlock('latest')
    // console.log('fdf', latestBlock)
    console.log(await source.eth.getBlockNumber())
    const block_number = await source.eth.getBlockNumber()
    let DB_BlockNumber = 0

    try {
        const sql = `SELECT number FROM block ORDER BY number DESC LIMIT 1`
        const [[result]] = await pool.execute(sql)
        DB_BlockNumber = result.number
        console.log(DB_BlockNumber)
    } catch (e) {
        console.error(e.message)
    }

    if (latestBlock.number > DB_BlockNumber) {
        for (let i = DB_BlockNumber + 1; i <= latestBlock.number; i++) {
            const block = await source.eth.getBlock(i, true)
            const {
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactions,
                transactionsRoot,
            } = block
            const sql = `INSERT INTO block(
            difficulty,
            extraData,
            gasLimit,
            gasUsed,
            hash,
            miner,
            mixHash,
            nonce,
            number,
            parentHash,
            receiptsRoot,
            sha3Uncles,
            size,
            stateRoot,
            timestamp,
            totalDifficulty,
            transactionsRoot
        ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

            const prepare = [
                difficulty,
                extraData,
                gasLimit,
                gasUsed,
                hash,
                miner,
                mixHash,
                nonce,
                number,
                parentHash,
                receiptsRoot,
                sha3Uncles,
                size,
                stateRoot,
                timestamp,
                totalDifficulty,
                transactionsRoot,
            ]
            try {
                const [result] = await pool.execute(sql, prepare)
            } catch (e) {
                console.error(e.message)
            }

            if (transactions.length > 0) {
                for (let j = 0; j < transactions.length; j++) {
                    const tx = await source.eth.getTransactionReceipt(transactions[j].hash)
                    const {
                        blockHash,
                        blockNumber,
                        contractAddress,
                        cumulativeGasUsed,
                        effectiveGasPrice,
                        from,
                        gasUsed,
                        status,
                        to,
                        transactionHash,
                        transactionIndex,
                        type,
                    } = tx
                    console.log(tx)

                    const sql = `INSERT INTO transaction(
                        blockHash, blockNumber, contractAddress, cumulativeGasUsed, effectiveGasPrice, 
                        sender, gasUsed, status, receiver, transactionHash, transactionIndex, type) 
                        VALUES(
                            ?,?,?,?,?,
                            ?,?,?,?,?,
                            ?,?
                        )`
                    const prepare = [
                        blockHash,
                        blockNumber,
                        contractAddress,
                        cumulativeGasUsed,
                        effectiveGasPrice,
                        from,
                        gasUsed,
                        status,
                        to,
                        transactionHash,
                        transactionIndex,
                        type,
                    ]
                    try {
                        const [result] = await pool.execute(sql, prepare)
                    } catch (e) {
                        console.error(e.message)
                    }
                }
            }
        }
    }
    res.json({})
})

router.post('/:idx', async (req, res) => {
    const idx = req.body.payload
    const sql = `SELECT * FROM block WHERE number=${idx}`
    try {
        const [[result]] = await pool.execute(sql)
        res.json(result)
    } catch (e) {
        console.error(e.message)
        res.json({})
    }
})

module.exports = router

CREATE TABLE block (
    difficulty VARCHAR(50) NOT NULL,
    extraData VARCHAR(200) NOT NULL,
    gasLimit INT,
    gasUsed INT,
    hash VARCHAR(200) NOT NULL,
    miner VARCHAR(200) NOT NULL,
    mixHash VARCHAR(200) NOT NULL,
    nonce VARCHAR(200) NOT NULL,
    number INT NOT NULL PRIMARY KEY,
    parentHash VARCHAR(200) NOT NULL,
    receiptsRoot VARCHAR(200) NOT NULL,
    sha3Uncles VARCHAR(200) NOT NULL,
    size INT,
    stateRoot VARCHAR(200) NOT NULL,
    timestamp INT,
    totalDifficulty VARCHAR(50),
    transactions VARCHAR(50),
    transactionsRoot VARCHAR(200),
    uncles VARCHAR(50)
)

CREATE TABLE transaction (
    blockHash CHAR(66) NOT NULL,
    blockNumber INT NOT NULL,
    contractAddress VARCHAR(10),
    cumulativeGasUsed INT NOT NULL,
    effectiveGasPrice INT NOT NULL,
    sender CHAR(42) NOT NULL,
    gasUsed INT NOT NULL,
    status VARCHAR(5) NOT NULL,
    receiver CHAR(42) NOT NULL,
    transactionHash CHAR(66) NOT NULL,
    transactionIndex INT NOT NULL,
    type VARCHAR(10) NOT NULL
)
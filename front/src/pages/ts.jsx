import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { tx_request } from '../reducers/tsx'

const Content = styled.div`
    display: flex;
    justify-content: center;
    padding: 140px;
`

const Tx = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 700px;
    height: 600px;
    padding: 100px 150px;
    border: 1px solid black;
    background-color: #f3f2f7;
    border-radius: 15px;
`

const Txct = styled.div`
    height: 50px;
    margin-bottom: 10px;
`

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    width: 150px;
    height: 40px;
    line-height: 40px;
    background-color: grey;
    border-radius: 10px;
    text-decoration: none;
    color: white;
    margin: 0 auto;
`

const TX = () => {
    const dispatch = useDispatch()
    const { TranX } = useSelector((state) => state)
    const { idx } = useParams()

    useEffect(() => {
        dispatch(tx_request(idx))
    }, [dispatch])

    return (
        <Content>
            {TranX && (
                <Tx>
                    <Txct style={{ textAlign: 'center', marginBottom: '50px', fontSize: '45px' }}>TRANSACTION</Txct>
                    <Txct>Num : {TranX.blockNumber}</Txct>
                    <Txct>Difficulty : {TranX.blockHash}</Txct>
                    <Txct>GasLimit : {TranX.cumulativeGasUsed}</Txct>
                    <Txct>GasUsed : {TranX.effectiveGasPrice}</Txct>
                    <Txct>Hash : {TranX.sender}</Txct>
                    <Txct>Miner : {TranX.gasUsed}</Txct>
                    <Txct>MixHash : {TranX.status}</Txct>
                    <Txct>Nonce : {TranX.receiver}</Txct>
                    <Txct>ParentHash : {TranX.transactionHash}</Txct>
                    <Txct>ReceiptRoot : {TranX.transactionIndex}</Txct>
                    <Txct>Sha3Uncles : {TranX.type}</Txct>
                    <StyledLink to="/">돌아가기</StyledLink>
                </Tx>
            )}
        </Content>
    )
}

export default TX

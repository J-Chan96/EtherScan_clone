import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { block_request } from '../reducers/block'

const Content = styled.div`
    display: flex;
    justify-content: center;
    padding: 140px;
`

const BK = styled.div`
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

const Bkct = styled.div`
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

const Block = () => {
    const dispatch = useDispatch()
    const { block } = useSelector((state) => state)
    const { idx } = useParams()

    useEffect(() => {
        dispatch(block_request(idx))
    }, [dispatch])

    return (
        <>
            <Content>
                {block && (
                    <BK>
                        <Bkct style={{ textAlign: 'center', marginBottom: '50px', fontSize: '45px' }}>BLOCK</Bkct>
                        <Bkct>Num : {block.number}</Bkct>
                        <Bkct>Difficulty : {block.difficulty}</Bkct>
                        <Bkct>EstraData : {block.extraData}</Bkct>
                        <Bkct>GasLimit : {block.gasLimit}</Bkct>
                        <Bkct>GasUsed : {block.gasUsed}</Bkct>
                        <Bkct>Hash : {block.hash}</Bkct>
                        <Bkct>Miner : {block.miner}</Bkct>
                        <Bkct>MixHash : {block.mixHash}</Bkct>
                        <Bkct>Nonce : {block.nonce}</Bkct>
                        <Bkct>ParentHash : {block.parentHash}</Bkct>
                        <Bkct>ReceiptRoot : {block.receiptRoot}</Bkct>
                        <Bkct>Sha3Uncles : {block.sha3Uncles}</Bkct>
                        <Bkct>Size : {block.size}</Bkct>
                        <Bkct>StateRoot : {block.stateRoot}</Bkct>
                        <Bkct>Timestamp : {block.timestamp}</Bkct>
                        <Bkct>TotalDifficulty : {block.totalDifficulty}</Bkct>
                        <StyledLink to="/">돌아가기</StyledLink>
                    </BK>
                )}
            </Content>
        </>
    )
}

export default Block

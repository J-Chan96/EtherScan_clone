import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { all_txs_request } from '../reducers/all'

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
`

const Header = styled.header`
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin-top: 50px;
`

const Main = styled.div``

const Span = styled.span`
    display: inline-block;
    text-align: center;
`
const Title = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1700px;
    height: 50px;
    font-weight: bolder;
    border-bottom: 1px solid black;
    background-color: #eeefff;
    margin-top: 50px;
`

const Alltsx = () => {
    const dispatch = useDispatch()
    const { all } = useSelector((state) => state)
    console.log(all)

    useEffect(() => {
        dispatch(all_txs_request())
    }, [dispatch])

    return (
        <Main>
            <Box>
                <Header>All Tsx</Header>
                <Title>
                    <Span style={{ width: '280px' }}>Block.</Span>
                    <Span style={{ width: '20px' }}>From.</Span>
                    <Span style={{ width: '600px' }}>To.</Span>
                    <Span style={{ width: '650px' }}>Tx Hash.</Span>
                    <Span style={{ width: '250px' }}>Index.</Span>
                </Title>
            </Box>
            {all &&
                all.txs.map((v, k) => (
                    <Box
                        key={k}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            margin: '30px 150px',
                        }}
                    >
                        <Span style={{ width: '30px' }}>{v.blockNumber}</Span>
                        <Span style={{ width: '50px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{v.sender}</Span>
                        <Span
                            style={{
                                width: '340px',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {v.receiver}
                        </Span>
                        <Span
                            style={{
                                width: '570px',
                                textAlign: 'center',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {v.transactionHash}
                        </Span>

                        <Span>{v.transactionIndex}</Span>
                    </Box>
                ))}
        </Main>
    )
}

export default Alltsx

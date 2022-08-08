import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { latest_request } from '../reducers/latest'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Content = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 100px;
    border-top: 1px solid;
`

const Main = styled.div`
    width: 800px;
`

const H3 = styled.h3`
    padding: 10px 14px 20px 14px;
    margin: 0px;
    line-height: px;
    &::before {
        content: '';
        background-image: url('https://avatars.githubusercontent.com/u/6250754?s=200&v=4');
        background-repeat: no-repeat;
        background-size: 40px 40px;
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 10px;
        position: relative;
        top: 12px;
    }
`

const Box = styled.div`
    height: 50px;
    padding: 10px;
    margin-right: 30px;
    /* border: 1px solid black; */
    /* border-radius: 10px; */
    /* background-color: #f3f2f7; */
    border-bottom: 1px solid #ddd;
    line-height: 50px;

    &:hover {
        background: #efefef;
    }
`

const Span = styled.span`
    display: inline-block;
`

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`

const Home = () => {
    const dispatch = useDispatch()
    const { latest } = useSelector((state) => state)

    const time = (_time) => {
        const now = Math.floor(new Date().getTime() / 1000) - _time
        if (now < 60) return now + '초'
        if (now < 3600) return Math.floor(now / 60) + '분 전'

        return Math.floor(now / 3600) + '시간 전'
    }

    useEffect(() => {
        dispatch(latest_request())
    }, [dispatch])

    return (
        <>
            <Content>
                <Main>
                    <H3>Latest Blocks</H3>
                    <Box style={{ borderBottom: 'none', fontWeight: 'bold', background: '#eeefff' }}>
                        <Span style={{ width: '50px', textAlign: 'center' }}>BK</Span>
                        <Span style={{ width: '80px' }}>Num</Span>
                        <Span style={{ width: '350px', textAlign: 'center' }}>Miner</Span>
                        <Span style={{ width: '200px', float: 'right' }}>Timestamp</Span>
                    </Box>
                    {latest &&
                        latest.blocks.map((v, k) => (
                            <Box key={k}>
                                <Span style={{ width: '50px', textAlign: 'center' }}>BK</Span>
                                <StyledLink to={'/block/' + v.number}>
                                    <Span style={{ width: '80px', color: 'blue' }}>{v.number}</Span>
                                </StyledLink>
                                <Span style={{ width: '140px', textAlign: 'center' }}>{v.miner}</Span>
                                <Span style={{ width: '175px', float: 'right' }}>{time(v.timestamp)}</Span>
                            </Box>
                        ))}
                </Main>
                <Main>
                    <H3>Latest Transactions</H3>
                    <Box style={{ borderBottom: 'none', fontWeight: 'bold', background: '#eeefff' }}>
                        <Span style={{ width: '50px', textAlign: 'center' }}>TX</Span>
                        <Span style={{ width: '50px' }}>BNum</Span>
                        <Span style={{ width: '550px', textAlign: 'center' }}>Hash</Span>
                        <Span style={{ width: '90px', float: 'right' }}>gasUsed</Span>
                    </Box>
                    {latest &&
                        latest.txs.map((v, k) => (
                            <Box key={k}>
                                <Span
                                    style={{
                                        width: '50px',
                                        textAlign: 'center',
                                    }}
                                >
                                    TX
                                </Span>
                                <Span style={{ width: '50px' }}>{v.blockNumber}</Span>
                                <StyledLink to={'/tranx/' + v.transactionHash}>
                                    <Span style={{ width: '200px', color: 'blue' }}>{v.transactionHash}</Span>
                                </StyledLink>
                                <Span style={{ width: '80px', float: 'right', overflow: 'hidden' }}>{v.gasUsed}</Span>
                            </Box>
                        ))}
                </Main>
            </Content>
        </>
    )
}

export default Home

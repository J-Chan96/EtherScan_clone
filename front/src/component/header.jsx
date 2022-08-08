import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderTemplate = styled.header`
    display: flex;
    justify-content: space-around;
    color: black;
    font-size: 30px;
    font-weight: bold;
    height: '100px';
    line-height: 100px;
    margin-top: 30px;
`

const Form = styled.form``

const Select = styled.select`
    width: 120px;
    height: 40px;
    padding: 0 6px;
    margin-right: 5px;
    font-size: 11px;
    font-weight: bold;
    border-left: 3px solid #eeefff;
    border-top: none;
    border-bottom: none;
    border-right: 3px solid #eeefff;
`
const Input = styled.input`
    width: 250px;
    height: 35px;
    font-size: 14px;
    font-weight: bold;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid #eeefff;
    margin-right: 5px;
`

const Submit = styled.input`
    width: 100px;
    height: 41px;
    font-size: 14px;
    font-weight: bold;
    background-color: #eeefff;
    border-radius: 5px;

    border: none;
    &:hover {
        cursor: pointer;
        background-color: #eeefff;
    }
`

const Logo = styled.span`
    &:before {
        content: '';
        background-repeat: no-repeat;
        background-size: 40px 40px;
        display: inline-block;
        margin-right: 10px;
        position: relative;
        top: 12px;
    }
`

const Header = () => {
    const submitHandler = async (e) => {
        e.preventDefault()
        const { selection, search } = e.target
        console.log(selection)
        switch (selection.value) {
            case 'blockNumber':
                if (search.value === '') break
                const result = await axios.post('http://localhost:4000/search/blockNumber', { number: search.value })
                console.log(result.data.count)
                if (result.data.count > 0) window.location.href = '/block/' + search.value
                else window.alert('해당 블록이 존재하지 않습니다.')
                break
            case 'miner':
                if (search.value.length !== 42) {
                    window.alert('miner의 길이가 맞지 않습니다')
                    break
                }
                const result2 = await axios.post('http://localhost:4000/search/miner', { miner: search.value })
                if (result2 === undefined) window.alert('존재하지 않는 miner입니다.')
                else window.location.href = '/block/' + result2.data
                break
            case 'txHash':
                console.log(search.value.length)
                if (search.value.length !== 66) {
                    window.alert('txHash의 길이가 맞지 않습니다')
                    break
                }
                const result3 = await axios.post('http://localhost:4000/search/txHash', { txHash: search.value })
                if (result3 === undefined) window.alert('존재하지 않는 txHash값입니다.')
                else window.location.href = '/tranx/' + result3.data
                break
            default:
                break
        }
    }

    return (
        <HeaderTemplate>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                <Logo>Chan's Block Explorer</Logo>
                <img
                    src="http://172.28.50.193:3000/jc.png"
                    alt="로고"
                    style={{ width: '40px', height: '40px', float: 'left', marginTop: '30px' }}
                />
            </Link>
            <Form onSubmit={submitHandler}>
                <Select id="selection">
                    <option value="blockNumber">Block Number</option>
                    <option value="miner">Miner</option>
                    <option value="txHash">TxHash</option>
                </Select>
                <Input type="text" id="search" placeholder="Block Number / Miner / TxHash" />
                <Submit type="submit" id="submit" value="Search" />
            </Form>
            <Link to="/Blockall" style={{ textDecoration: 'none', color: 'black' }}>
                <span style={{ borderBottom: '4px solid' }}>BLOCK</span>
            </Link>
            <Link to="/Tsxall" style={{ textDecoration: 'none', color: 'black' }}>
                <span style={{ borderBottom: '4px solid' }}>TRANSACTION</span>
            </Link>
        </HeaderTemplate>
    )
}

export default Header

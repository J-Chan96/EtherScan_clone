import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { tx_request, tx_success, tx_failure } from '../reducers/tsx'

async function TxAPI(action) {
    const result = await axios.post(`http://localhost:4000/tranx/:idx`, action)
    console.log(result)
    return result
}

function* Tx(action) {
    try {
        const result = yield call(TxAPI, action)
        yield put({
            type: tx_success.toString(),
            payload: result.data,
        })
    } catch (e) {
        yield put({
            type: tx_failure.toString(),
            payload: e.response.data,
        })
    }
}

export default function* TxSaga() {
    yield takeLatest(tx_request.toString(), Tx)
}
